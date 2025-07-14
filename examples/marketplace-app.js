// marketplace-app.js - Verified seller marketplace
import dotenv from 'dotenv';
dotenv.config();


import { GraphiteClient } from '../GraphiteClient.js';

class TrustMarketplace {
  constructor() {
    this.client = new GraphiteClient();
  }

  async initialize() {
    await this.client.initialize();
    console.log('🛒 TrustMarket Initialized');
  }

  async getSellerProfile(sellerAddress) {
    const assessment = await this.client.assessUserForMarketplace(sellerAddress);
    
    console.log(`\n👤 SELLER PROFILE: ${sellerAddress}`);
    console.log(`🏆 Badge: ${assessment.sellerBadge}`);
    console.log(`⭐ Trust Score: ${assessment.trustScore}`);
    console.log(`🔐 Verification: ${assessment.verificationLevel}`);
    console.log(`💰 Max Listing: ${assessment.recommendedMaxListingValue}`);
    console.log(`🔒 High-Value Sales: ${assessment.canSellHighValue ? 'Enabled' : 'Disabled'}`);

    return assessment;
  }

  async createListing(sellerAddress, itemValue, itemName) {
    const profile = await this.getSellerProfile(sellerAddress);
    
    console.log(`\n📝 LISTING: ${itemName} ($${itemValue.toLocaleString()})`);
    
    // Check if seller can list high-value items
    if (itemValue > 10000 && !profile.canSellHighValue) {
      console.log(`⚠️ RESTRICTED: Complete ID verification for high-value listings`);
      return { success: false, reason: 'Verification required for high-value items' };
    }

    console.log(`✅ LISTING APPROVED with ${profile.sellerBadge}`);
    return { success: true, badge: profile.sellerBadge };
  }
}

// Demo usage
async function marketplaceDemo() {
  const marketplace = new TrustMarketplace();
  await marketplace.initialize();
  
  const sellerAddress = marketplace.client.web3.graphite.getWalletAddress();
  
  // Test different listing values
  await marketplace.createListing(sellerAddress, 500, 'Vintage Watch');
  await marketplace.createListing(sellerAddress, 15000, 'Luxury Car');
}

marketplaceDemo().catch(console.error);