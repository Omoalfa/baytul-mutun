import { HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';

export function SupportButton() {
  return (
    <div className="fixed bottom-8 right-8">
      <Button 
        size="lg" 
        className="rounded-full bg-gold hover:bg-gold/90 shadow-lg"
      >
        <MessageCircle className="h-5 w-5 mr-2" />
        Need Help?
      </Button>
    </div>
  );
}
