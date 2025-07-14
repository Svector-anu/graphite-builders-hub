# 🚀 Graphite Builders Hub

**The official starter kit for developers building trust-first dApps on the Graphite Network**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![Web3.js](https://img.shields.io/badge/Web3.js-Compatible-blue)](https://web3js.org/)

---

## 🎯 What is Graphite Builders Hub?

Graphite Builders Hub is your launchpad for building decentralized apps powered by **trust, reputation**, and **identity verification** using the Graphite Network.

Instead of treating every user the same, your dApp can react to **trust scores**, **KYC status**, and more — all securely and on-chain.

### ✅ Why use this?

* 🔐 **Trust-First Architecture** – Stop building for wallets, start building for people.
* 📇 **KYC & Identity** – Tap into verified user data without storing it yourself.
* 📊 **Reputation Scores** – Build apps that reward good behavior.
* ⚙️ **Works out-of-the-box** – Real examples + ready GraphiteClient SDK

---

## 👥 Who is this for?

This repo is perfect for:

* 🧱 **New blockchain devs** exploring real-world use cases
* ⚡ **Hackathon builders** looking to stand out
* 🧠 **Experienced Web3.js / ethers / viem users** curious about trust dApps
* 🧑‍💼 **Project teams** building with KYC, compliance, or risk engines

---

## 🧱 Project Structure

```
graphite-builders-hub/
├── GraphiteClient.js           # Core Graphite SDK wrapper
├── examples/
│   ├── lending-app.js          # dApp: Trust-based lending approval
│   ├── marketplace-app.js      # dApp: Verified seller listings
│   └── coming-soon/           # (Optional space for new dApps)
├── .env.example                # Safe config template
├── package.json               # Includes Web3.js + Graphite plugin
├── README.md                  # This file
└── CONTRIBUTING.md            # (Optional) Contribution guide
```

---

## ⚡ How to Use It

### Option 1: Clone and Run (Best for learning/testing)

```bash
git clone https://github.com/Svector-anu/graphite-builders-hub.git
cd graphite-builders-hub

# Install dependencies
npm install

# Copy the example environment file
cp .env.example .env
# Fill in your API keys and settings inside .env

# Run lending example
date node examples/lending-app.js

# Run marketplace example
node examples/marketplace-app.js
```

### Option 2: Build Your Own (Start fresh using our SDK)

```bash
mkdir my-trust-dapp && cd my-trust-dapp
npm init -y
npm install web3 dotenv @atgraphite/web3-plugin

# Then copy our GraphiteClient
curl -O https://raw.githubusercontent.com/Svector-anu/graphite-builders-hub/main/GraphiteClient.js

# Copy and edit the environment config
curl -O https://raw.githubusercontent.com/Svector-anu/graphite-builders-hub/main/.env.example
cp .env.example .env
```

Now start building your own trust-first dApp using the SDK and sample logic.

---

## 🔐 .env Configuration

```env
# Graphite Network
GRAPHITE_RPC_URL=https://rpc.graphite.network
GRAPHITE_API_URL=https://api.graphite.network
GRAPHITE_API_KEY=your_api_key_here
```

Add contract addresses if needed:

```env
LENDING_CONTRACT_ADDRESS=0x...
MARKETPLACE_CONTRACT_ADDRESS=0x...
```

---

## 🧪 Example Use Cases

### ✅ Lending App (Risk assessment)

```js
const graphite = new GraphiteClient();
const borrower = await graphite.getUser("0x123...");

if (borrower.trustScore > 700) {
  console.log("✅ Loan Approved");
} else {
  console.log("⚠️ Loan Denied – Low trust score");
}
```

### 🛍 Marketplace App (Seller verification)

```js
const graphite = new GraphiteClient();
const seller = await graphite.getUser("0xabc...");
const isVerified = await graphite.isKYCVerified(seller.address);

if (isVerified && seller.trustScore > 600) {
  console.log("✅ Verified seller - Listing allowed");
} else {
  console.log("❌ Not eligible to list high-value items");
}
```

---

## 🎯 Learning Goals

By completing this starter kit, you’ll understand:

* ✅ How to use `GraphiteClient.js` in your own projects
* 🔍 How to fetch trust data, scores, and KYC verification
* 🛠 How to build dApps that adapt to real users
* 📦 How to safely manage `.env` configs for live deployments

---

## 🧑‍💻 Contributing

Want to help improve this hub?

1. Fork this repo
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request!

Ideas:

* 🧪 Add new trust-based dApp examples (social media, gaming, etc.)
* 🧰 Add more helper functions/utilities
* 📖 Write tutorials or walkthroughs

---

## 📋 Requirements

* Node.js 16+
* NPM or Yarn
* Basic Web3 knowledge (wallets, txs)
* Graphite API key → [https://graphite.network/api](https://graphite.network/api)

---

## 🧠 Resources

* 📚 Docs: [https://docs.graphite.network](https://docs.graphite.network)
* 💬 Community: [https://discord.gg/graphite](https://discord.gg/graphite)
* 🧑‍💻 API Keys: [https://graphite.network/api](https://graphite.network/api)

---

## 🪪 License

MIT © 2025 – [Svector](https://github.com/Svector-anu)

---

**Ready to build trust-first dApps?** Start cloning or start coding 🧠

---
