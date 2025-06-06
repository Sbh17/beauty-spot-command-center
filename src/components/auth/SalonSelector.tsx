
import { useAuth } from '@/hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2 } from 'lucide-react';

// Mock salon data - replace with actual data fetching
const salonNames: Record<string, string> = {
  'salon-1': 'Glamour Studio',
  'salon-2': 'Beauty Haven',
  'salon-3': 'Radiant Salon'
};

export const SalonSelector = () => {
  const { user, switchSalon, isSalonOwner } = useAuth();

  if (!isSalonOwner || !user?.salonIds || user.salonIds.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
      <Building2 className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium">Current Salon:</span>
      <Select value={user.currentSalonId || ''} onValueChange={switchSalon}>
        <SelectTrigger className="w-40 h-8">
          <SelectValue placeholder="Select salon" />
        </SelectTrigger>
        <SelectContent>
          {user.salonIds.map((salonId) => (
            <SelectItem key={salonId} value={salonId}>
              {salonNames[salonId] || salonId}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
