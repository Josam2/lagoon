# 🚀 Complete Deployment Guide for Lagoon

This comprehensive guide walks you through deploying your Lagoon sBTC lending app to production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [Environment Configuration](#environment-configuration)
4. [Vercel Deployment](#vercel-deployment)
5. [GitHub Actions Setup](#github-actions-setup)
6. [Security Secrets Management](#security-secrets-management)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools
- Git (v2.30+)
- Node.js (v18+)
- npm (v8+) or yarn/pnpm
- GitHub account
- Vercel account (free tier available)
- OpenWeather API key

### Accounts Needed
- [GitHub](https://github.com) - Source control
- [Vercel](https://vercel.com) - Hosting platform
- [OpenWeatherMap](https://openweathermap.org) - Weather data
- [Hiro Wallet](https://www.hiro.so/wallet) - Stacks integration (optional)

---

## Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/Josam2/lagoon.git
cd lagoon
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Create Environment File

```bash
cp .env.example .env.local
```

### 4. Configure Local Environment

Edit `.env.local` with your configuration:

```env
# Stacks Blockchain
NEXT_PUBLIC_STACKS_API_URL=https://api.testnet.hiro.so
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_SBTC_CONTRACT_ID=SP1Y5YSTAHZ88XYK1NXJWKQP7NQVJQY8YT6V5ZQ39.sbtc

# Weather API
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key

# Application
NEXT_PUBLIC_APP_NAME=Lagoon Lending
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Test All Features

- [ ] Weather dashboard loads at `/weather`
- [ ] Weather forecast loads at `/weather-forecast`
- [ ] Search functionality works
- [ ] API routes respond correctly
- [ ] No console errors

---

## Environment Configuration

### Development Environment Variables

```env
# Network Configuration
NEXT_PUBLIC_STACKS_API_URL=https://api.testnet.hiro.so
NEXT_PUBLIC_NETWORK=testnet

# sBTC Configuration
NEXT_PUBLIC_SBTC_CONTRACT_ID=SP1Y5YSTAHZ88XYK1NXJWKQP7NQVJQY8YT6V5ZQ39.sbtc

# Weather API
NEXT_PUBLIC_OPENWEATHER_API_KEY=abc123def456

# Application Settings
NEXT_PUBLIC_APP_NAME=Lagoon
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production Environment Variables

```env
# Switch to mainnet for production
NEXT_PUBLIC_STACKS_API_URL=https://api.mainnet.hiro.so
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_SBTC_CONTRACT_ID=production_contract_id

# Production weather API key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_production_key

# Production URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Build Configuration

The `next.config.js` includes:
- SWC minification for faster builds
- Image optimization
- Webpack fallbacks for blockchain libraries
- Environment variable handling

---

## Vercel Deployment

### Step 1: Sign Up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Repository

1. Click **"Add New"** → **"Project"**
2. Select **"Import Git Repository"**
3. Search for `Josam2/lagoon`
4. Click **"Import"**

### Step 3: Configure Project Settings

**Framework Preset**: Next.js (auto-detected)

**Build Command**: `next build` (auto-detected)

**Output Directory**: `.next` (auto-detected)

**Environment Variables**: Add these before deploying:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_STACKS_API_URL` | `https://api.mainnet.hiro.so` |
| `NEXT_PUBLIC_NETWORK` | `mainnet` |
| `NEXT_PUBLIC_SBTC_CONTRACT_ID` | Your contract ID |
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | Your API key |

### Step 4: Deploy

Click **"Deploy"**

Vercel will:
1. Clone your repository
2. Install dependencies
3. Run build (`npm run build`)
4. Deploy to CDN
5. Provide a live URL

**You're live!** 🎉

### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records per Vercel's instructions

---

## GitHub Actions Setup

### Create Workflow File

Create `.github/workflows/deploy.yml`:

```yaml

name: Deploy Lagoon sBTC
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Deploy
        env:
          LAGOON_SBTC_TOKEN: ${{ secrets.LAGOON_SBTC_TOKEN }}
        run: |
          # Use the token in your script
          echo "Deploying with token: $LAGOON_SBTC_TOKEN"
          # Your deployment script here

name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  build:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Push Workflow

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions CI/CD"
git push origin main
```

---

## Security Secrets Management

### Get Vercel Credentials

1. **Vercel Token**:
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Click "Create Token"
   - Name it: `GITHUB_DEPLOYMENT`
   - Copy the token

2. **Organization ID**:
   - Settings → General → Team ID/Org ID
   - Copy the ID

3. **Project ID**:
   - Project Settings → General
   - Copy the Project ID

### Add GitHub Secrets

1. Go to your repo: **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add three secrets:

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | Paste Vercel token |
| `VERCEL_ORG_ID` | Paste Org ID |
| `VERCEL_PROJECT_ID` | Paste Project ID |

### Secure API Keys

Never commit `.env.local` to git:

```bash
# Verify .gitignore includes
cat .gitignore | grep env
```

Add to `.env` section if missing:
```
.env.local
.env.*.local
.env.production.local
```

---

## Post-Deployment Verification

### Verify Live Deployment

1. **Visit your URL**: `https://[project-name].vercel.app`
2. **Check pages**:
   - [ ] Homepage loads
   - [ ] `/weather` page works
   - [ ] `/weather-forecast` works
   - [ ] API routes respond

3. **Test functionality**:
   - [ ] Search for a city
   - [ ] Toggle temperature units
   - [ ] View weather forecast
   - [ ] Console shows no errors

### Monitor Performance

1. **Vercel Analytics**: Project → Analytics
2. **Core Web Vitals**: Check metrics
3. **Error Tracking**: Vercel's error dashboard
4. **Traffic**: Monitor real user metrics

### Setup Error Notifications

1. Go to Project Settings → Git
2. Enable deployment notifications
3. Add Slack/email alerts (optional)

---

## Continuous Deployment Workflow

### Development Process

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes
echo "code changes"

# 3. Run tests locally
npm run lint
npm run build

# 4. Commit changes
git add .
git commit -m "feat: add new feature"

# 5. Push and create PR
git push origin feature/new-feature

# 6. GitHub Actions runs automatically
# - Lint check
# - Build verification
# - (Tests if configured)

# 7. After merge to main
# - Automatic Vercel deployment
# - Live update within minutes
```

### Production Release Checklist

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables configured
- [ ] Security scan passed
- [ ] Performance benchmarks met
- [ ] Merged to main branch
- [ ] Deployed and verified

---

## Troubleshooting

### Build Fails

**Error**: `Build failed`

**Solutions**:
```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be v18+

# Test build locally
npm run build
```

### Deployment Stops

**Error**: `Deployment cancelled`

**Solutions**:
- Check GitHub Actions logs
- Verify all secrets are set
- Check API key validity
- Review recent commits for errors

### Environment Variables Missing

**Error**: `API key not configured`

**Solutions**:
```bash
# In Vercel dashboard:
1. Project Settings → Environment Variables
2. Add all vars from .env.example
3. Redeploy: Deployments → ... → Redeploy
```

### API Routes Not Working

**Error**: `404 on /api/weather`

**Solutions**:
```bash
# Verify file location
ls pages/api/weather.js

# Check file syntax
npm run lint

# Rebuild
npm run build

# Test locally
npm run dev
# Visit http://localhost:3000/api/weather?city=London
```

### Weather API Returns 401

**Error**: `API key not valid`

**Solutions**:
1. Get new key from [openweathermap.org](https://openweathermap.org/api)
2. Update in Vercel environment variables
3. Redeploy application
4. Wait 2-3 minutes for key to activate

---

## Monitoring & Maintenance

### Weekly Checks

- [ ] Monitor deployment logs
- [ ] Check error rates
- [ ] Review performance metrics
- [ ] Test critical paths

### Monthly Tasks

- [ ] Update dependencies: `npm update`
- [ ] Security audit: `npm audit`
- [ ] Review Vercel analytics
- [ ] Backup configuration

### Deploy New Features

```bash
# Feature branch → PR → Review → Merge → Auto Deploy
git flow release start v1.1.0
# Make changes
git flow release finish v1.1.0
git push origin main
```

---

## Additional Resources

- **[Vercel Documentation](https://vercel.com/docs)**
- **[Next.js Deployment](https://nextjs.org/docs/deployment)**
- **[GitHub Actions](https://github.com/features/actions)**
- **[Stacks Documentation](https://docs.stacks.co)**
- **[OpenWeather API](https://openweathermap.org/api)**

---

## Support

If deployment issues occur:

1. **Check logs**: Vercel Deployments → View logs
2. **Review errors**: GitHub Actions → Workflow runs
3. **Test locally**: `npm run dev`
4. **Check status**: [Vercel Status](https://vercel.status.dev)

---

**Deployment Date**: May 2026
**Next Review**: June 2026
**Maintainer**: Josam2

Good luck with your Lagoon deployment! 🚀
