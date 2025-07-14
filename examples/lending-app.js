// lending-app.js - Complete lending application
import dotenv from 'dotenv';
dotenv.config();


import { GraphiteClient } from '../GraphiteClient.js';

class TrustLendingApp {
  constructor() {
    this.client = new GraphiteClient();
    this.loanPool = 1000000; // $1M lending pool
  }

  async initialize() {
    await this.client.initialize();
    console.log('🏦 TrustLend Protocol Initialized');
  }

  async processLoanApplication(borrowerAddress, amount, purpose) {
    console.log(`\n📋 LOAN APPLICATION`);
    console.log(`Borrower: ${borrowerAddress}`);
    console.log(`Amount: $${amount.toLocaleString()}`);
    console.log(`Purpose: ${purpose}`);

    // Assess borrower using Graphite trust data
    const assessment = await this.client.assessUserForLending(borrowerAddress, amount);
    
    console.log(`\n📊 ASSESSMENT RESULT:`);
    if (assessment.eligible) {
      console.log(`✅ APPROVED!`);
      console.log(`💰 Amount: $${assessment.approvedAmount.toLocaleString()}`);
      console.log(`📈 Rate: ${assessment.interestRate}`);
      console.log(`🎯 Risk: ${assessment.riskLevel}`);
      console.log(`⭐ Trust Score: ${assessment.trustScore}`);
    } else {
      console.log(`❌ DENIED: ${assessment.reason}`);
      console.log(`💡 Recommendation: ${assessment.recommendation}`);
    }

    return assessment;
  }
}

// Demo usage
async function lendingDemo() {
  const app = new TrustLendingApp();
  await app.initialize();
  
  // Test loan applications with different amounts
  await app.processLoanApplication(
    app.client.web3.graphite.getWalletAddress(),
    5000,
    'Business expansion'
  );
}

lendingDemo().catch(console.error);