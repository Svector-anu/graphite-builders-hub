# Graphite Builders Hub

The official starter kit for developers building **trust-first dApps** using the Graphite Network.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![Web3.js](https://img.shields.io/badge/Web3.js-Compatible-blue)](https://web3js.org/)

##  What is Graphite Builders Hub?

Graphite Builders Hub is your gateway to building decentralized applications with built-in trust and reputation systems. Instead of treating all users equally, your dApps can make intelligent decisions based on verified identity and trust scores.

**What makes this special?**
-  **Trust-First Architecture**: Build dApps that know who they're dealing with
-  **KYC Integration**: Seamless identity verification without sacrificing decentralization  
-  **Reputation Systems**: Leverage trust scores for better user experiences
-  **Ready-to-Use**: Pre-built examples and utilities to get you started immediately

##  Who is this for?

- **New blockchain developers** looking to build more sophisticated dApps
- **Hackathon builders** who want to stand out with trust-based features
- **Development teams** exploring KYC and compliance use cases
- **Web3 developers** familiar with ethers.js, viem, or Web3.js who want to level up

## 📁 Project Structure

```
graphite-builders-hub/
├── src/
│   └── GraphiteClient.js          # Core client for Graphite Network
├── examples/
│   ├── lending-app.js             # Trust-based lending demo
│   └── marketplace-app.js         # Seller verification demo
├── .env.example                   # Pre-configured environment template
├── package.json                   # Dependencies and scripts
└── README.md                      # You are here!
```

### Core Components

- **`GraphiteClient.js`**: A reusable client powered by Web3.js and @atgraphite/web3-plugin
- **Lending App Example**: Demonstrates trust-based loan approvals and risk assessment
- **Marketplace App Example**: Shows seller verification with dynamic trust scores
- **Environment Setup**: Pre-configured with Graphite RPC and API endpoints

##  Quick Start

### Option 1: Clone and Run (Recommended for Learning)

```bash
# Clone the repository
git clone https://github.com/your-org/graphite-builders-hub.git
cd graphite-builders-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys (instructions included in file)

# Run the lending app example
node examples/lending-app.js

# Run the marketplace app example  
node examples/marketplace-app.js
```

### Option 2: Build From Scratch (For New Projects)

```bash
# Create your new project
mkdir my-graphite-dapp
cd my-graphite-dapp

# Initialize npm project
npm init -y

# Install required dependencies
npm install web3 @atgraphite/web3-plugin dotenv

# Copy the GraphiteClient (you can download this file from our repo)
curl -o GraphiteClient.js https://raw.githubusercontent.com/your-org/graphite-builders-hub/main/src/GraphiteClient.js

# Create your environment file
curl -o .env.example https://raw.githubusercontent.com/your-org/graphite-builders-hub/main/.env.example
cp .env
```

## 🔧 Environment Setup

Your `.env` file should include:

```env
# # Wallet configuration
PRIVATE_KEY=your_private_key_here

# Graphite network endpoints
GRAPHITE_NODE_URL=https://anon-entrypoint-1.atgraphite.com
GRAPHITE_API_URL=https://api.main.atgraphite.com/api


# Optional: Custom contract addresses
LENDING_CONTRACT_ADDRESS=0x...
MARKETPLACE_CONTRACT_ADDRESS=0x...
```

##  Learning Examples

### 1. Trust-Based Lending App

```javascript
// Run: node examples/lending-app.js
const graphite = new GraphiteClient();

// Check borrower's trust score before approving loan
const borrower = await graphite.getUser('0x...');
if (borrower.trustScore > 750) {
    // Approve loan with favorable terms
    console.log('✅ Loan approved - high trust score');
} else {
    // Request additional collateral or deny
    console.log('⚠️ Additional verification required');
}
```

### 2. Marketplace with Seller Verification

```javascript  
// Run: node examples/marketplace-app.js
const graphite = new GraphiteClient();

// Verify seller before listing expensive items
const seller = await graphite.getUser('0x...');
const isVerified = await graphite.isKYCVerified(seller.address);

if (isVerified && seller.trustScore > 600) {
    console.log('✅ Verified seller - can list high-value items');
} else {
    console.log('📝 Basic seller - limited to small transactions');
}
```

##  Learning Goals

By working through this starter kit, you'll learn:

- **Trust Integration**: How to query and use trust scores in your dApp logic
- **KYC Verification**: Implementing identity checks without storing personal data
- **Risk Assessment**: Building algorithms that adapt to user reputation
- **Web3 Best Practices**: Clean patterns for blockchain application development
- **Graphite Network**: Understanding the trust layer and its capabilities



##  Contributing

We welcome contributions! Here's how to get involved:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Add** your example or improvement
4. **Test** your changes with both example apps
5. **Commit** with clear messages: `git commit -m 'Add: new trust scoring example'`
6. **Push** to your branch: `git push origin feature/amazing-feature`
7. **Open** a Pull Request

### Contribution Ideas

-  **New Example Apps**: Gaming with reputation, social platforms, DeFi protocols
-  **Documentation**: Tutorials, guides, API reference improvements  
-  **Developer Tools**: Testing utilities, debugging helpers, deployment scripts
-  **Integrations**: Support for other Web3 libraries, framework adapters

##  Requirements

- **Node.js** 16.0.0 or higher
- **npm** or **yarn** package manager
- **Basic Web3 knowledge** (transactions, wallets, smart contracts)
- **an activated graphite account** 

##  Support & Community

- 📖 **Documentation**: [https://docs.atgraphite.com/](https://docs.atgraphite.com/)
- 💬 **Discord**: [Join our community](https://discord.gg/k6kNNeQGv7)
-  **Telegram**: [Join our Builders hub](https://t.me/+Fwq1LXJqf2Q1ZWE0)
-    **Issues**: [GitHub Issues](https://github.com/Svector-anu/graphite-builders-hub/issues)
- 📧 **Email**: support@graphite.com


  Acknowledgments

- Built on the robust foundation of **Web3.js**
- Powered by **Graphite Network**'s trust infrastructure
- Inspired by the amazing **Web3 developer community**

---

**Want help, updates, or to connect with other builders?** [👉 Join the Graphite Developer Community on Telegram](https://t.me/+Fwq1LXJqf2Q1ZWE0) and start building! 

*Have questions? Join our [Discord community](https://discord.gg/k6kNNeQGv7) or check out our [documentation](https://docs.atgraphite.com/).*
