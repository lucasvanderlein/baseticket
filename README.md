# BaseTicket

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

The project is configured for automatic GitHub Pages deployment:

### Automatic Deployment (Recommended)

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy your site
3. Your app will be available at `https://lucasvanderlein.github.io/baseticket/`

### Manual Deployment

1. Build the project for production:
   ```bash
   npm run build:prod
   ```

2. Test the production build locally:
   ```bash
   npm run preview:prod
   ```

3. The built files will be in the `dist/` directory

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "GitHub Actions" as the source
4. The workflow will automatically deploy on every push to main

### Configuration

The app is configured with the correct base path (`/base-ticket-forge/`) for GitHub Pages deployment in `vite.config.ts`.

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For support, please open an issue on GitHub.
