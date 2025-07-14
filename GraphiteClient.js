// GraphiteClient.js - Production-ready Graphite wrapper
import Web3 from 'web3';
import { GraphitePlugin } from '@atgraphite/web3-plugin';

export class GraphiteClient {
  constructor(config = {}) {
    this.config = {
      nodeUrl: config.nodeUrl || process.env.GRAPHITE_NODE_URL,
      privateKey: config.privateKey || process.env.PRIVATE_KEY,
      apiUrl: config.apiUrl || process.env.GRAPHITE_API_URL,
      ...config
    };

    this.web3 = null;
    this.apiClient = null;
    this.isInitialized = false;
  }

  async initialize() {
    console.log('🚀 Initializing Graphite Client...');

    // Setup Web3 with Graphite plugin
    this.web3 = new Web3(this.config.nodeUrl);
    this.web3.eth.accounts.wallet.add(this.config.privateKey);
    this.web3.registerPlugin(new GraphitePlugin(this.web3));

    // Setup API client
    this.apiClient = new GraphiteAPIClient(this.config.apiUrl);

    this.isInitialized = true;
    console.log('✅ Graphite Client ready!');

    return { success: true };
  }

  // 🔐 ACCOUNT MANAGEMENT
  async activateAccount() {
    this._ensureInitialized();

    const isActivated = await this.web3.graphite.isActivated();
    if (isActivated) {
      return { success: true, message: 'Already activated' };
    }

    try {
      console.log('🔄 Activating account...');
      const result = await this.web3.graphite.activateAccount();
      console.log('✅ Account activated!');

      return {
        success: true,
        txHash: result.transactionHash,
        blockNumber: result.blockNumber
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getActivationFee() {
    this._ensureInitialized();
    return await this.web3.graphite.getActivationFeeAmount();
  }

  // 🔍 TRUST DATA
  async getTrustProfile(address = null) {
    this._ensureInitialized();

    const userAddress = address || this.web3.graphite.getWalletAddress();

    const [activated, reputationRaw, kycLevelRaw, filterLevelRaw] = await Promise.all([
      this.web3.graphite.isActivated(userAddress),
      this.web3.graphite.getReputation(userAddress),
      this.web3.graphite.getKycLevel(userAddress),
      this.web3.graphite.getFilterLevel(userAddress)
    ]);

    const reputation = Number(reputationRaw);
    const kycLevel = Number(kycLevelRaw);
    const filterLevel = Number(filterLevelRaw);

    return {
      address: userAddress,
      activated,
      reputation,
      kycLevel,
      filterLevel,
      trustLevel: this._calculateTrustLevel(reputation, kycLevel),
      eligibleFeatures: this._getEligibleFeatures(reputation, kycLevel, activated)
    };
  }

  // 🔐 KYC MANAGEMENT
  async startKYC(level = 1) {
    this._ensureInitialized();

    try {
      const currentLevel = Number(await this.web3.graphite.getKycLevel());
      if (currentLevel >= level) {
        return { success: true, message: `Already at KYC Level ${currentLevel}` };
      }

      const fee = await this.web3.graphite.getKYCFee(level);
      console.log(`💰 KYC Level ${level} fee:`, fee);

      const uuid = `kyc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const result = await this.web3.graphite.createKYCRequest(uuid, level);

      return {
        success: true,
        level,
        requestId: uuid,
        txHash: result.transactionHash
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getKycStatus() {
    this._ensureInitialized();

    const [currentLevelRaw, lastRequest] = await Promise.all([
      this.web3.graphite.getKycLevel(),
      this.web3.graphite.getLastKycRequest()
    ]);

    const currentLevel = Number(currentLevelRaw);

    return {
      currentLevel,
      lastRequest,
      canUpgrade: currentLevel < 3,
      nextLevel: currentLevel < 3 ? currentLevel + 1 : null
    };
  }

  // 🎯 TRUST-BASED FEATURES
  async assessUserForLending(userAddress, requestedAmount) {
    const profile = await this.getTrustProfile(userAddress);

    if (!profile.activated) {
      return {
        eligible: false,
        reason: 'Account must be activated',
        recommendation: 'Complete account activation first'
      };
    }

    if (profile.kycLevel < 1) {
      return {
        eligible: false,
        reason: 'KYC verification required',
        recommendation: 'Complete email verification (KYC Level 1)'
      };
    }

    // Calculate loan terms based on trust
    const trustMultiplier = Math.max(1, profile.reputation / 100);
    const kycMultiplier = profile.kycLevel + 1;
    const maxLoan = trustMultiplier * kycMultiplier * 1000;

    const baseRate = 5.0;
    const riskPremium = profile.reputation < 300 ? 5 :
                        profile.reputation < 500 ? 2 : 0;
    const kycDiscount = profile.kycLevel * 0.5;
    const interestRate = baseRate + riskPremium - kycDiscount;

    const eligible = requestedAmount <= maxLoan;

    return {
      eligible,
      requestedAmount,
      approvedAmount: eligible ? requestedAmount : maxLoan,
      maxLoanAmount: maxLoan,
      interestRate: `${interestRate.toFixed(2)}%`,
      trustScore: profile.reputation,
      kycLevel: profile.kycLevel,
      riskLevel: this._assessRisk(profile)
    };
  }

  async assessUserForMarketplace(userAddress) {
    const profile = await this.getTrustProfile(userAddress);

    return {
      sellerBadge: this._getSellerBadge(profile.reputation, profile.kycLevel),
      trustScore: profile.reputation,
      verificationLevel: this._getKYCDescription(profile.kycLevel),
      canSellHighValue: profile.reputation >= 500 && profile.kycLevel >= 2,
      recommendedMaxListingValue: this._getMaxListingValue(profile)
    };
  }

  // Helper methods
  _ensureInitialized() {
    if (!this.isInitialized) {
      throw new Error('GraphiteClient not initialized. Call initialize() first.');
    }
  }

  _calculateTrustLevel(reputation, kycLevel) {
    if (reputation >= 750 && kycLevel >= 2) return 'Excellent';
    if (reputation >= 500 && kycLevel >= 1) return 'Good';
    if (reputation >= 250) return 'Building';
    return 'New';
  }

  _getEligibleFeatures(reputation, kycLevel, activated) {
    const features = [];
    if (activated) features.push('Basic Trading');
    if (kycLevel >= 1) features.push('Lending', 'Borrowing');
    if (kycLevel >= 2) features.push('Advanced Trading');
    if (reputation >= 500) features.push('Premium Rates');
    return features;
  }

  _assessRisk(profile) {
    if (profile.reputation >= 600 && profile.kycLevel >= 2) return 'Low';
    if (profile.reputation >= 400 && profile.kycLevel >= 1) return 'Medium';
    return 'High';
  }

  _getSellerBadge(reputation, kycLevel) {
    if (reputation >= 750 && kycLevel >= 2) return '🥇 Trusted Seller';
    if (reputation >= 500 && kycLevel >= 1) return '🥈 Verified Seller';
    if (reputation >= 250) return '🥉 New Seller';
    return '⚠️ Build Reputation';
  }

  _getKYCDescription(level) {
    const descriptions = {
      0: 'Unverified',
      1: 'Email Verified',
      2: 'ID Verified',
      3: 'Video Verified'
    };
    return descriptions[level] || 'Unknown';
  }

  _getMaxListingValue(profile) {
    if (profile.reputation >= 750 && profile.kycLevel >= 2) return 'Unlimited';
    if (profile.reputation >= 500 && profile.kycLevel >= 1) return '$50,000';
    if (profile.reputation >= 250) return '$10,000';
    return '$1,000';
  }
}

// Simple API client for additional data
class GraphiteAPIClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getNetworkStats() {
    try {
      const response = await fetch(`${this.baseUrl}?module=block&action=getlatestblockno`);
      const data = await response.json();
      return data.status === "1" ? { latestBlock: parseInt(data.result, 16) } : null;
    } catch {
      return null;
    }
  }
}
