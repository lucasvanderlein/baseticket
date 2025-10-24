import { useParams, Link } from 'react-router-dom';
import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, MapPin, Users, Ticket, ExternalLink, ArrowLeft, Sparkles } from 'lucide-react';
import { BASE_EVENT_ABI, BASE_EVENT_CONTRACT_ADDRESS, EventStruct } from '@/config/contracts';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { mockEvents } from '@/data/mockEvents';

const Event = () => {
  const { id } = useParams();
  const { address, isConnected } = useAccount();
  
  // Skip contract call if contract address is not set (all zeros)
  const isContractDeployed = BASE_EVENT_CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';
  
  const { data: contractEvents, isLoading } = useReadContract({
    address: BASE_EVENT_CONTRACT_ADDRESS,
    abi: BASE_EVENT_ABI,
    functionName: 'getActiveEvents',
    query: {
      enabled: isContractDeployed, // Only make the call if contract is deployed
    }
  }) as { data: EventStruct[] | undefined; isLoading: boolean };

  // Use mock events if contract returns no events
  const allEvents = contractEvents && contractEvents.length > 0 ? contractEvents : mockEvents;

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Check if user already has a ticket for this event
  const { data: userTickets } = useReadContract({
    address: BASE_EVENT_CONTRACT_ADDRESS,
    abi: BASE_EVENT_ABI,
    functionName: 'getUserTickets',
    args: address ? [address] : undefined,
    query: {
      enabled: isContractDeployed && !!address,
    }
  }) as { data: bigint[] | undefined };

  const event = allEvents?.find((e) => e.id.toString() === id);

  // Check if user already has a ticket for this specific event
  const [hasTicketForThisEvent, setHasTicketForThisEvent] = useState(false);
  
  // Check if user has RSVPed for this specific event
  const { data: hasRSVPed } = useReadContract({
    address: BASE_EVENT_CONTRACT_ADDRESS,
    abi: BASE_EVENT_ABI,
    functionName: 'hasRSVPed',
    args: event ? [event.id, address] : undefined,
    query: {
      enabled: isContractDeployed && !!event && !!address,
    }
  }) as { data: boolean | undefined };
  
  useEffect(() => {
    if (hasRSVPed !== undefined) {
      setHasTicketForThisEvent(hasRSVPed);
    }
  }, [hasRSVPed]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('🎟 Ticket minted successfully!', {
        description: 'Check your profile to view your NFT ticket',
      });
    }
  }, [isSuccess]);


  const handleRSVP = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    writeContract({
      address: BASE_EVENT_CONTRACT_ADDRESS,
      abi: BASE_EVENT_ABI,
      functionName: 'rsvp',
      args: [BigInt(id!)],
    } as any, {
      onError: (error: any) => {
        console.error('RSVP Error:', error);
        if (error.message?.includes('Already RSVPed')) {
          toast.error('You already have a ticket for this event!');
        } else if (error.message?.includes('Event is sold out')) {
          toast.error('This event is sold out!');
        } else if (error.message?.includes('Event has ended')) {
          toast.error('This event has already ended!');
        } else {
          toast.error('Failed to mint ticket. Please try again.');
        }
      }
    });
  };

  // Don't show loading state if contract is not deployed
  const showLoading = isContractDeployed && isLoading;
  
  if (showLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-96 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <Link to="/">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const eventDate = new Date(Number(event.date) * 1000);
  const isPast = eventDate < new Date();
  const availableTickets = Number(event.maxTickets) - Number(event.totalRSVPs);
  const isSoldOut = event.isSoldOut || availableTickets <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2 hover:bg-secondary/50">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-elevated">
              <div className="h-3 bg-gradient-to-r from-primary via-accent to-primary rounded-full mb-6" />
              
              <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-muted-foreground">
                      {eventDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-muted-foreground">
                      {eventDate.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-muted-foreground">
                      {event.totalRSVPs.toString()} RSVPs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Ticket className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Tickets</p>
                    <p className="text-muted-foreground">
                      {isSoldOut ? 'Sold Out' : `${availableTickets} of ${event.maxTickets.toString()} available`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-3">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="border-t mt-6 pt-6">
                <p className="text-sm text-muted-foreground">
                  Organized by:{' '}
                  <a
                    href={`https://sepolia.basescan.org/address/${event.organizer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {event.organizer.slice(0, 6)}...{event.organizer.slice(-4)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20 bg-card/50 backdrop-blur-sm border-border/50 shadow-elevated">
              <div className="text-center mb-6">
                {/* Ticket preview using the same design */}
                <div className="relative mb-4">
                  <img 
                    src="/ticket-template.png" 
                    alt="Event Ticket Preview" 
                    className="w-full h-auto mx-auto"
                    style={{
                      backgroundColor: 'transparent',
                      mixBlendMode: 'normal',
                      imageRendering: 'auto',
                      transform: 'scale(0.6)',
                      transformOrigin: 'center'
                    }}
                    onError={(e) => {
                      console.log('PNG image failed to load, trying alternatives...');
                      const img = e.currentTarget as HTMLImageElement;
                      
                      // Try different image formats
                      const alternatives = [
                        '/ticket-template.jpg',
                        '/ticket-template.jpeg',
                        '/ticket-template.webp',
                        '/ticket-template.svg'
                      ];
                      
                      let currentIndex = 0;
                      const tryNext = () => {
                        if (currentIndex < alternatives.length) {
                          img.src = alternatives[currentIndex];
                          currentIndex++;
                        } else {
                          // All alternatives failed, show fallback
                          img.style.display = 'none';
                          const fallback = document.getElementById('fallback-ticket-preview');
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
                  <div className="absolute inset-0 bg-blue-500 opacity-0" id="fallback-ticket-preview">
                    <div className="h-full flex flex-col justify-center items-center text-white p-4">
                      <div className="text-2xl font-bold mb-2">TICKET</div>
                      <div className="text-sm opacity-80">BASE EVENT</div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">Get Your Ticket</h3>
                <p className="text-sm text-muted-foreground">
                  RSVP to mint a free NFT ticket as proof of attendance
                </p>
              </div>

              {isSuccess ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 backdrop-blur-sm">
                    <p className="text-center font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                      🎟 Ticket Minted!
                    </p>
                    <p className="text-sm text-center text-muted-foreground">
                      Your NFT ticket has been minted successfully
                    </p>
                  </div>
                  <Link to="/profile">
                    <Button className="w-full">View My Tickets</Button>
                  </Link>
                  {hash && (
                    <a
                      href={`https://sepolia.basescan.org/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        View on BaseScan
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              ) : hasTicketForThisEvent ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 backdrop-blur-sm">
                    <p className="text-center font-medium text-green-600 mb-2">
                      ✅ You already have a ticket!
                    </p>
                    <p className="text-sm text-center text-muted-foreground">
                      You've already minted a ticket for this event
                    </p>
                  </div>
                  <Link to="/profile">
                    <Button className="w-full">View My Tickets</Button>
                  </Link>
                </div>
              ) : (
                <Button
                  onClick={handleRSVP}
                  disabled={!isConnected || isPending || isConfirming || isPast || isSoldOut}
                  className="w-full"
                >
                  {isPending || isConfirming ? (
                    'Minting Ticket...'
                  ) : isPast ? (
                    'Event Ended'
                  ) : isSoldOut ? (
                    'Sold Out'
                  ) : !isConnected ? (
                    'Connect Wallet to RSVP'
                  ) : (
                    'RSVP & Mint Ticket'
                  )}
                </Button>
              )}

              <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-secondary/30 to-accent/10 border border-border/50 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground text-center">
                  This ticket is a soulbound NFT on Base Sepolia and cannot be transferred
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
