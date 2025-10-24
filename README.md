# Base Ticket Forge

A decentralized event ticketing platform built on Base Sepolia testnet. Create, manage, and attend events with NFT tickets as proof of attendance.

## Features

- 🎫 **NFT Tickets**: Soulbound NFT tickets as proof of attendance
- 🎪 **Event Management**: Create and manage events with ticket limits
- 🔗 **Web3 Integration**: Connect with MetaMask and other Web3 wallets
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🚀 **Base Network**: Built on Base Sepolia testnet

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Web3**: Wagmi + Viem
- **Blockchain**: Base Sepolia testnet
- **Smart Contract**: Solidity

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask wallet
- Base Sepolia testnet configured in MetaMask

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/base-ticket-forge.git
cd base-ticket-forge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

### Building for Production

```bash
npm run build
```

## Smart Contract

The project uses a deployed smart contract on Base Sepolia testnet:

**Contract Address**: `0x82E87E8D356A4d222A2E603BA6bcfD83f0bd6Afb`

**Features**:
- Event creation and management
- Ticket minting with limits
- RSVP functionality
- Soulbound NFT tickets

## Usage

1. **Connect Wallet**: Connect your MetaMask wallet
2. **Browse Events**: View available events on the homepage
3. **Create Event**: Create new events with ticket limits
4. **RSVP**: Get NFT tickets for events
5. **View Tickets**: Check your tickets in the profile section

## Deployment

The project is configured for GitHub Pages deployment:

1. Build the project: `npm run build`
2. Deploy to GitHub Pages
3. The app will be available at `https://yourusername.github.io/base-ticket-forge/`

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For support, please open an issue on GitHub.