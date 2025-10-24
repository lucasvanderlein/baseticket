import { useReadContract, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Ticket } from 'lucide-react';
import { BASE_EVENT_ABI, BASE_EVENT_CONTRACT_ADDRESS, EventStruct } from '@/config/contracts';

const Profile = () => {
  const { address, isConnected } = useAccount();

  // Skip contract call if contract address is not set (all zeros)
  const isContractDeployed = BASE_EVENT_CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000' as `0x${string}`;
  
  const { data: ticketIds, isLoading: loadingTickets, error: ticketsError } = useReadContract({
    address: BASE_EVENT_CONTRACT_ADDRESS,
    abi: BASE_EVENT_ABI,
    functionName: 'getUserTickets',
    args: address ? [address] : undefined,
    query: {
      enabled: isContractDeployed && !!address, // Only make the call if contract is deployed and address exists
      retry: 1, // Limit retries to prevent hanging
      retryDelay: 1000, // 1 second delay between retries
    }
  }) as { data: bigint[] | undefined; isLoading: boolean; error: any };

  // Get all active events to check which tickets are still valid
  const { data: activeEvents, isLoading: loadingEvents } = useReadContract({
    address: BASE_EVENT_CONTRACT_ADDRESS,
    abi: BASE_EVENT_ABI,
    functionName: 'getActiveEvents',
    query: {
      enabled: isContractDeployed,
      retry: 1,
      retryDelay: 1000,
    }
  }) as { data: EventStruct[] | undefined; isLoading: boolean };

  const [isTimedOut, setIsTimedOut] = useState(false);

  // Set timeout to prevent infinite loading
  useEffect(() => {
    if (loadingTickets) {
      const timeout = setTimeout(() => {
        setIsTimedOut(true);
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    }
  }, [loadingTickets]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Connect your wallet to view your NFT tickets
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">My Tickets</h1>
          <p className="text-muted-foreground">
            Your NFT tickets as proof of attendance on Base Sepolia
          </p>
        </div>

        {isContractDeployed && loadingTickets && !isTimedOut ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : isTimedOut ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
              <Ticket className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Loading timeout</h3>
            <p className="text-muted-foreground mb-6">
              Loading is taking longer than expected. Please try refreshing the page.
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        ) : ticketsError ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <Ticket className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Error loading tickets</h3>
            <p className="text-muted-foreground mb-6">
              There was an error loading your tickets. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : ticketIds && ticketIds.length > 0 ? (
          <TicketList 
            ticketIds={ticketIds} 
            activeEvents={activeEvents || []} 
            isLoadingEvents={loadingEvents}
          />
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
              <Ticket className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
            <p className="text-muted-foreground mb-6">
              RSVP to events to collect NFT tickets
            </p>
            <Link to="/">
              <Button>Browse Events</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Component to display tickets efficiently
const TicketList = ({ 
  ticketIds, 
  activeEvents, 
  isLoadingEvents 
}: { 
  ticketIds: bigint[]; 
  activeEvents: EventStruct[]; 
  isLoadingEvents: boolean;
}) => {
  if (isLoadingEvents) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    );
  }

  // For now, show all tickets and let individual TicketCard components handle validation
  // This prevents the complex async logic that was causing issues
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ticketIds.slice(0, 10).map((tokenId) => (
        <TicketCardWithValidation key={tokenId.toString()} tokenId={tokenId} />
      ))}
    </div>
  );
};

// Individual ticket card with its own validation
const TicketCardWithValidation = ({ tokenId }: { tokenId: bigint }) => {
  const isContractDeployed = BASE_EVENT_CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000' as `0x${string}`;
  
  const { data: event, isLoading, error } = useReadContract({
    address: BASE_EVENT_CONTRACT_ADDRESS,
    abi: BASE_EVENT_ABI,
    functionName: 'getTicketEvent',
    args: [tokenId],
    query: {
      enabled: isContractDeployed,
      retry: 1,
      retryDelay: 1000,
    }
  }) as { data: EventStruct | undefined; isLoading: boolean; error: any };

  if (isLoading) {
    return <Skeleton className="h-64 rounded-lg" />;
  }

  if (error || !event) {
    return null; // Don't render if there's an error or no event
  }

  // Check if event is cancelled (date is 0)
  if (event.date === BigInt(0)) {
    return null; // Don't render cancelled events
  }

  return <TicketCard tokenId={tokenId} event={event} />;
};

const TicketCard = ({ tokenId, event }: { tokenId: bigint; event: EventStruct }) => {
  const eventDate = new Date(Number(event.date) * 1000);
  
  // Get the correct path for the ticket template image
  const getImagePath = (filename: string) => {
    // Check if we're in preview mode (port 4173 or 4174)
    const isPreview = window.location.port === '4173' || window.location.port === '4174';
    const basePath = isPreview ? '/baseticket/' : '/';
    return `${basePath}${filename}`;
  };

  return (
    <div className="relative">
      {/* Ticket using your image file - no background, no borders */}
      <div className="relative">
        <img 
          src={getImagePath("ticket-template.png")} 
          alt="Event Ticket" 
          className="w-full h-auto"
          style={{
            backgroundColor: 'transparent',
            mixBlendMode: 'normal',
            imageRendering: 'auto',
            transform: 'scale(0.8)',
            transformOrigin: 'center'
          }}
          onError={(e) => {
            console.log('PNG image failed to load, trying alternatives...');
            const img = e.currentTarget as HTMLImageElement;
            
            // Try different image formats
            const alternatives = [
              getImagePath('ticket-template.jpg'),
              getImagePath('ticket-template.jpeg'),
              getImagePath('ticket-template.webp'),
              getImagePath('ticket-template.svg')
            ];
            
            let currentIndex = 0;
            const tryNext = () => {
              if (currentIndex < alternatives.length) {
                img.src = alternatives[currentIndex];
                currentIndex++;
              } else {
                // All alternatives failed, show fallback
                img.style.display = 'none';
                const fallback = document.getElementById('fallback-ticket');
                if (fallback) {
                  fallback.style.opacity = '1';
                }
              }
            };
            
            // Try next alternative
            tryNext();
          }}
        />
        
        {/* Fallback ticket design if image doesn't load */}
        <div className="absolute inset-0 bg-blue-500 opacity-0" id="fallback-ticket">
          <div className="h-full flex flex-col justify-center items-center text-white p-4">
            <div className="text-2xl font-bold mb-2">TICKET</div>
            <div className="text-sm opacity-80">BASE EVENT</div>
          </div>
        </div>
        
        {/* Event information below the ticket */}
        <div className="mt-1 text-center">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">{event.name}</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>{eventDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}</p>
            <p>{eventDate.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</p>
            <p className="text-gray-500">{event.location}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
