import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';
import { EventStruct } from '@/config/contracts';

interface EventCardProps {
  event: EventStruct;
}

const EventCard = ({ event }: EventCardProps) => {
  const eventDate = new Date(Number(event.date) * 1000);
  const isPast = eventDate < new Date();
  const isToday = eventDate.toDateString() === new Date().toDateString();
  const availableTickets = Number(event.maxTickets) - Number(event.totalRSVPs);
  const isSoldOut = event.isSoldOut || availableTickets <= 0;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevated group border border-border/50">
      <div className="h-1 bg-primary" />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
            {event.name}
          </h3>
          <div className="ml-2 flex gap-1">
            {isToday && (
              <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Today
              </div>
            )}
            {isSoldOut && (
              <div className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                Sold Out
              </div>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">{eventDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}</span>
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
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Ticket className="h-4 w-4 text-primary" />
            <span className="font-medium">
              {isSoldOut ? 'Sold Out' : `${availableTickets} tickets left`}
            </span>
          </div>
        </div>

        <Link to={`/event/${event.id}`}>
          <Button 
            className={`w-full transition-colors ${
              isPast || isSoldOut
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : 'bg-primary hover:bg-primary/90'
            }`} 
            disabled={isPast || isSoldOut}
          >
            {isPast ? 'Event Ended' : isSoldOut ? 'Sold Out' : 'View Event'}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export { EventCard };
export default EventCard;
