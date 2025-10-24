import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BASE_EVENT_ABI, BASE_EVENT_CONTRACT_ADDRESS } from '@/config/contracts';
import { toast } from 'sonner';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
    maxTickets: '',
  });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    // Combine date and time into timestamp
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    const timestamp = Math.floor(dateTime.getTime() / 1000);

    writeContract({
      address: BASE_EVENT_CONTRACT_ADDRESS,
      abi: BASE_EVENT_ABI,
      functionName: 'createEvent',
      args: [formData.name, formData.description, formData.location, BigInt(timestamp), BigInt(formData.maxTickets)],
    } as any);
  };

  if (isSuccess) {
    toast.success('Event created successfully!');
    navigate('/');
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

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Create New Event</h1>
            <p className="text-muted-foreground">
              Create an on-chain event and let people RSVP with NFT tickets
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Event Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Web3 Developer Meetup"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell people what your event is about..."
                  required
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., 123 Main St, San Francisco, CA"
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="mt-2"
                    lang="en"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    className="mt-2"
                    lang="en"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="maxTickets">Maximum Tickets *</Label>
                <Input
                  id="maxTickets"
                  type="number"
                  min="1"
                  value={formData.maxTickets}
                  onChange={(e) => setFormData({ ...formData, maxTickets: e.target.value })}
                  placeholder="e.g., 100"
                  required
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Set the maximum number of tickets available for this event
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={!isConnected || isPending || isConfirming}
                  className="w-full"
                  size="lg"
                >
                  {isPending || isConfirming ? (
                    'Creating Event...'
                  ) : !isConnected ? (
                    'Connect Wallet to Create'
                  ) : (
                    'Create Event'
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Create;
