import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const NetworkIndicator = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  if (!isConnected) return null;

  const isCorrectNetwork = chainId === baseSepolia.id;

  if (isCorrectNetwork) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-medium text-secondary-foreground">
          Base Sepolia
        </span>
      </div>
    );
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>Please switch to Base Sepolia network</span>
        <Button
          onClick={() => switchChain({ chainId: baseSepolia.id })}
          variant="outline"
          size="sm"
        >
          Switch Network
        </Button>
      </AlertDescription>
    </Alert>
  );
};
