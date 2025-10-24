# 🚀 BaseEvent Contract Deployment Guide

## Prerequisites

1. **Base Sepolia ETH** - Get testnet ETH from [Base Faucet](https://www.coinbase.com/faucet/base-ethereum-sepolia-faucet)
2. **Private Key** - Export from MetaMask or your wallet
3. **Node.js** - Version 18 or higher

## Quick Deployment

### 1. Install Dependencies

```bash
cd contracts
npm install
```

### 2. Set Environment Variables

Create a `.env` file:

```bash
# Base Sepolia Private Key (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# Optional: BaseScan API Key for contract verification
BASESCAN_API_KEY=your_basescan_api_key_here
```

### 3. Compile Contract

```bash
npm run compile
```

### 4. Deploy to Base Sepolia

```bash
npm run deploy
```

## What Happens During Deployment

1. **Contract Creation** - Deploys BaseEvent.sol
2. **Initial Events** - Automatically creates 6 demo events:
   - Web3 Developer Meetup (San Francisco, CA)
   - NFT Art Exhibition (New York, NY)
   - DeFi Summit 2025 (Miami, FL)
   - Base Hackathon (Austin, TX)
   - Crypto Trading Workshop (Los Angeles, CA)
   - Blockchain Gaming Conference (Seattle, WA)

3. **Verification** - Checks that all events were created successfully

## After Deployment

1. **Copy Contract Address** from the deployment output
2. **Update Frontend** - Replace `BASE_EVENT_CONTRACT_ADDRESS` in `src/config/contracts.ts`
3. **Test Integration** - Visit your website and test RSVP functionality

## Contract Features

- ✅ **6 Pre-loaded Events** - Ready to use immediately
- ✅ **NFT Tickets** - Soulbound tokens for proof of attendance
- ✅ **RSVP System** - Users can RSVP to events
- ✅ **Event Management** - Create new events
- ✅ **Ticket Tracking** - View user's NFT tickets
- ✅ **Base Sepolia Ready** - Optimized for Base network

## Gas Costs

- **Deployment**: ~0.01 ETH
- **Create Event**: ~0.001 ETH
- **RSVP**: ~0.002 ETH

## Troubleshooting

### Issue: "Insufficient funds"
- Get more Base Sepolia ETH from the faucet

### Issue: "Invalid private key"
- Make sure your private key doesn't include "0x" prefix

### Issue: "Network not found"
- Check that you're connected to Base Sepolia (Chain ID: 84532)

## Support

- [Base Documentation](https://docs.base.org/)
- [Base Sepolia Faucet](https://www.coinbase.com/faucet/base-ethereum-sepolia-faucet)
- [BaseScan Explorer](https://sepolia.basescan.org/)
