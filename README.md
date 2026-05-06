# Lagoon sBTC Lending Application

## 📋 Project Overview

Lagoon is a decentralized lending application built on the **Stacks blockchain**, leveraging **sBTC** (Synthetic Bitcoin) for lending and borrowing operations with algorithmic interest rates and collateral management.

## ✨ Key Features

- **Lending Pool**: Supply sBTC to earn algorithmic interest
- **Borrowing**: Borrow sBTC using supplied assets as collateral
- **Interest Rates**: Dynamic rates based on pool utilization
- **Collateral Management**: Add/remove collateral to manage loan-to-value ratio
- **Secure Transactions**: Built on Stacks blockchain with Clarity smart contracts

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Blockchain** | Stacks (STX) |
| **Smart Contracts** | Clarity |
| **Primary Asset** | sBTC |
| **Frontend Framework** | Next.js 14+ |
| **Styling** | Tailwind CSS |
| **UI Components** | React |
| **State Management** | @stacks/connect |
| **Build Tool** | Next.js & SWC |

## 📦 Dependencies

### Core Blockchain Integration
- `@stacks/connect@^7.4.0` - Wallet connection and authentication
- `@stacks/network@^6.8.1` - Network configuration
- `@stacks/transactions@^6.9.0` - Transaction signing and serialization
- `sbtc@^0.1.7` - sBTC bridge functionality
- `sbtc-bridge-lib@^1.1.8` - Advanced sBTC operations

### Cryptography
- `@noble/hashes@^1.3.2` - Hash functions
- `@scure/base@^1.1.3` - Base encoding/decoding
- `@scure/btc-signer@^1.1.0` - Bitcoin signing utilities

### Frontend
- `next@latest` - React framework with SSR
- `react@latest` - UI library
- `react-dom@latest` - React DOM renderer

### Development
- `tailwindcss@latest` - Utility-first CSS
- `autoprefixer@latest` - CSS vendor prefixing
- `postcss@latest` - CSS transformation
- `eslint@latest` - Code linting
- `eslint-config-next@latest` - Next.js ESLint rules

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Josam2/lagoon.git
   cd lagoon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_STACKS_API_URL=https://api.testnet.hiro.so
   NEXT_PUBLIC_NETWORK=testnet
   NEXT_PUBLIC_SBTC_CONTRACT_ID=your_contract_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint code quality checks |

## 🏗️ Project Structure

```
lagoon/
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
├── lib/                    # Utility functions & helpers
├── styles/                 # Global styles
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS setup
├── vercel.json             # Vercel deployment config
└── .github/workflows/      # CI/CD pipelines
```

## 🔗 Core Functions

### Lending Operations
- `supply(sBTC_amount)` - Supply sBTC to the lending pool
- `withdraw(sBTC_amount)` - Withdraw sBTC from pool
- `getPoolStats()` - View current pool utilization

### Borrowing Operations
- `borrow(sBTC_amount, collateral)` - Borrow sBTC with collateral
- `repay(sBTC_amount)` - Repay borrowed amount + interest
- `getLoanStatus()` - Check loan details

### Collateral Management
- `addCollateral(amount)` - Increase collateral backing
- `removeCollateral(amount)` - Reduce collateral with LTV check
- `getLTV()` - Get loan-to-value ratio

## 🔐 Security Considerations

⚠️ **Important**: This is a basic implementation for educational purposes.

- **Smart Contract Risks**: Potential vulnerabilities require auditing
- **sBTC Volatility**: Price fluctuations impact collateral values
- **Account Abstraction**: Ensure proper key management
- **Rate Risks**: Interest rates change with pool utilization

## 📊 Deployment

### Deploy to Vercel (Recommended)

1. **Connect Repository**
   - Sign up at [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Set Environment Variables**
   - Add all variables from `.env.example` in Vercel settings

3. **Automatic Deployment**
   - Every push to `main` triggers automatic deployment
   - GitHub Actions workflow handles build & testing

### Environment Setup for Production

```bash
# Testnet
NEXT_PUBLIC_STACKS_API_URL=https://api.testnet.hiro.so
NEXT_PUBLIC_NETWORK=testnet

# Mainnet (production)
NEXT_PUBLIC_STACKS_API_URL=https://api.mainnet.hiro.so
NEXT_PUBLIC_NETWORK=mainnet
```

### Required GitHub Secrets
Add these to your repository Settings → Secrets & variables:

```
VERCEL_TOKEN          # Vercel authentication token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
```

## 🌐 Network Configuration

### Testnet (Development)
- API: `https://api.testnet.hiro.so`
- Explorer: [testnet.explorer.stacks.co](https://testnet.explorer.stacks.co)
- Faucet: Request testnet STX tokens

### Mainnet (Production)
- API: `https://api.mainnet.hiro.so`
- Explorer: [explorer.stacks.co](https://explorer.stacks.co)
- Real assets & transactions

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Stacks Developer Docs](https://docs.stacks.co)
- [sBTC Bridge](https://www.sbtc.tech)
- [Clarity Language](https://docs.stacks.co/clarity)
- [Hiro Wallet](https://www.hiro.so/wallet)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Social Links

Connect with the developer:
- **Bluesky**: [josamtech.bsky.social](https://bsky.app/profile/josamtech.bsky.social)
- **Twitter**: [@TechsphereH](https://x.com/TechsphereH)
- **Facebook**: [Josam Profile](https://www.facebook.com/share/1CFEEnoCrY/)

## ⚡ Quick Links

- 🏠 [Repository](https://github.com/Josam2/lagoon)
- 🐛 [Report Issues](https://github.com/Josam2/lagoon/issues)
- 💬 [Discussions](https://github.com/Josam2/lagoon/discussions)
- 📦 [Releases](https://github.com/Josam2/lagoon/releases)

---

**Status**: Active Development | **Last Updated**: May 2026

*For production use, conduct security audits and thorough testing before deploying with real assets.*
