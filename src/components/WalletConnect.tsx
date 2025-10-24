import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-secondary-foreground">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Disconnect</span>
        </Button>
      </div>
    );
  }

  const getWalletName = (connector: any) => {
    // Check for specific wallet providers
    if (typeof window !== 'undefined') {
      if ((window as any).ethereum?.isMetaMask) return 'MetaMask';
      if ((window as any).rabby) return 'Rabby';
      if ((window as any).coinbaseWalletExtension) return 'Coinbase Wallet';
    }
    
    // Fallback to connector name
    const name = connector.name.toLowerCase();
    if (name.includes('metamask')) return 'MetaMask';
    if (name.includes('rabby')) return 'Rabby';
    if (name.includes('coinbase')) return 'Coinbase Wallet';
    return 'Browser Wallet';
  };

  const getWalletIcon = (connector: any) => {
    // Check for specific wallet providers
    if (typeof window !== 'undefined') {
      if ((window as any).ethereum?.isMetaMask) return '🦊';
      if ((window as any).rabby) return '🐰';
      if ((window as any).coinbaseWalletExtension) return '🔵';
    }
    
    // Fallback to connector name
    const name = connector.name.toLowerCase();
    if (name.includes('metamask')) return '🦊';
    if (name.includes('rabby')) return '🐰';
    if (name.includes('coinbase')) return '🔵';
    return '👛';
  };

  // Filter out duplicate wallets
  const uniqueConnectors = connectors.filter((connector, index, self) => {
    const name = getWalletName(connector);
    return self.findIndex(c => getWalletName(c) === name) === index;
  });

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {uniqueConnectors.map((connector) => (
          <DropdownMenuItem
            key={connector.uid}
            onClick={() => {
              connect({ connector });
              setIsOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-lg">{getWalletIcon(connector)}</span>
            <span>{getWalletName(connector)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
