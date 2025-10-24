import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, MapPin, Users, X, ArrowLeft, Settings } from 'lucide-react';
import { BASE_EVENT_ABI, BASE_EVENT_CONTRACT_ADDRESS, EventStruct } from '@/config/contracts';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageEvents = () => {
  const { address, isConnected } = useAccount();
  const isContractDeployed = BASE_EVENT_CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000';

  const { data: allEvents, isLoading } = useReadContract({
    address: BASE_EVENT_CONTRACT_ADDRESS,
    abi: BASE_EVENT_ABI,
    functionName: 'getAllEvents',
    query: {
      enabled: isContractDeployed,
    }
  }) as { data: EventStruct[] | undefined; isLoading: boolean };

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Event deleted successfully!');
    }
  }, [isSuccess]);

  const handleCancelEvent = (eventId: bigint) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    writeContract({
      address: BASE_EVENT_CONTRACT_ADDRESS,
      abi: BASE_EVENT_ABI,
      functionName: 'cancelEvent',
      args: [eventId],
    } as any);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Connect your wallet to manage your events
          </p>
        </div>
      </div>
    );
  }

  // Filter events created by current user and exclude cancelled events
  const myEvents = allEvents?.filter(event => 
    event.organizer.toLowerCase() === address?.toLowerCase() && 
    event.date !== BigInt(0) // Exclude cancelled events (date = 0)
  ) || [];

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
          <h1 className="text-4xl font-bold mb-3">Manage My Events</h1>
          <p className="text-muted-foreground">
            Cancel or manage events you've created
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : myEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map((event) => (
              <EventManageCard 
                key={event.id.toString()} 
                event={event} 
                onCancel={() => handleCancelEvent(event.id)}
                isCancelling={isPending || isConfirming}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No events created</h3>
            <p className="text-muted-foreground mb-6">
              You haven't created any events yet
            </p>
            <Link to="/create">
              <Button>Create Your First Event</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const EventManageCard = ({ 
  event, 
  onCancel, 
  isCancelling 
}: { 
  event: EventStruct; 
  onCancel: () => void;
  isCancelling: boolean;
}) => {
  const eventDate = new Date(Number(event.date) * 1000);
  const isPast = eventDate < new Date();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevated border border-border/50">
      <div className={`h-1 ${isPast ? 'bg-gray-500' : 'bg-primary'}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 flex-1">
            {event.name}
          </h3>
          {isPast && (
            <div className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              Ended
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">
              {eventDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="text-xs">•</span>
            <span className="text-xs">{eventDate.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-medium">{event.totalRSVPs.toString()} RSVPs</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={`/event/${event.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Event
            </Button>
          </Link>
          <Button
            onClick={onCancel}
            disabled={isCancelling}
            variant="destructive"
            size="icon"
            className="shrink-0"
            title={isPast ? "Delete past event" : "Cancel event"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ManageEvents;
