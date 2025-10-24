import { Link } from 'react-router-dom';
import { WalletConnect } from './WalletConnect';
import { NetworkIndicator } from './NetworkIndicator';
import { ThemeToggle } from './ThemeToggle';
import { Ticket } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Ticket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              BaseEvent
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/create" className="text-sm font-medium hover:text-primary transition-colors">
                Create
              </Link>
              <Link to="/manage" className="text-sm font-medium hover:text-primary transition-colors">
                Manage
              </Link>
              <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors">
                My Tickets
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <NetworkIndicator />
              <WalletConnect />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
