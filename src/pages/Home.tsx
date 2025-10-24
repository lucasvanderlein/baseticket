import { useReadContract, useAccount } from 'wagmi';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { Plus, Sparkles, Calendar, Users, MapPin } from 'lucide-react';
import { BASE_EVENT_ABI, BASE_EVENT_CONTRACT_ADDRESS, EventStruct } from '@/config/contracts';
import { mockEvents } from '@/data/mockEvents';
import { useMemo } from 'react';

const Home = () => {
  const { isConnected } = useAccount();
  
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

  // Get 6 random events from available events
  const events = useMemo(() => {
    const allEvents = contractEvents && contractEvents.length > 0 ? contractEvents : mockEvents;
    const shuffled = [...allEvents].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [contractEvents]);

  // Don't show loading state if contract is not deployed
  const showLoading = isContractDeployed && isLoading;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            On-Chain Event
            <br />
            <span className="text-3xl md:text-4xl text-primary">Ticketing Platform</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Create, discover, and attend events with blockchain-powered NFT tickets. 
            Experience the future of event management on Base.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isConnected ? (
              <Link to="/create">
                <Button size="lg" className="gap-2 px-6 py-3 text-base bg-primary hover:bg-primary/90 transition-colors">
                  <Plus className="h-5 w-5" />
                  Create Event
                </Button>
              </Link>
            ) : (
              <div className="text-center">
                <p className="text-base text-muted-foreground mb-3">
                  Connect your wallet to get started
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>Free to create • Instant minting • Secure & transparent</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Featured Events
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Discover amazing events happening around the world, powered by blockchain technology
            </p>
          </div>

          {showLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id.toString()} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 shadow-glow">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No events yet</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Be the first to create an event on Base and start building the future of event management!
              </p>
              {isConnected && (
                <Link to="/create">
                  <Button size="lg" className="gap-3 px-8 py-4 text-lg bg-gradient-primary hover:shadow-glow transition-smooth">
                    <Plus className="h-5 w-5" />
                    Create Your First Event
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Events Created</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Tickets Minted</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
