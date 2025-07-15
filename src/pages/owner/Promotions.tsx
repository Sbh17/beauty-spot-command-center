import { useState } from "react";
import { Plus, Edit, Trash2, Tag, Calendar, DollarSign, Eye, EyeOff, Users, Clock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { StatsCard } from "@/components/shared/StatsCard";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Mock data for promotions
const promotions = [
  {
    id: '1',
    title: 'New Customer Special',
    description: '20% off first visit for new customers',
    type: 'percentage',
    value: 20,
    code: 'NEWCLIENT20',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    isActive: true,
    usageCount: 45,
    usageLimit: 100,
    services: ['All Services'],
    conditions: 'Valid for first-time customers only'
  },
  {
    id: '2',
    title: 'Happy Hour Hair',
    description: 'Fixed price for hair services 2-4 PM',
    type: 'fixed',
    value: 35,
    code: 'HAPPYHAIR',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31'),
    isActive: true,
    usageCount: 128,
    usageLimit: null,
    services: ['Hair Cut', 'Hair Styling'],
    conditions: 'Available Monday-Friday 2-4 PM only'
  },
  {
    id: '3',
    title: 'Loyalty Reward',
    description: 'Buy 5 services, get 1 free',
    type: 'loyalty',
    value: 0,
    code: 'LOYAL5',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: false,
    usageCount: 23,
    usageLimit: null,
    services: ['All Services'],
    conditions: 'Must be existing customer with 5+ visits'
  }
];

const Promotions = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const { toast } = useToast();

  const handleCreatePromotion = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Promotion Created",
      description: "Your new promotion has been created successfully.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleTogglePromotion = (id: string) => {
    toast({
      title: "Promotion Updated",
      description: "Promotion status has been updated.",
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Promotion code has been copied to clipboard.",
    });
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'bg-blue-100 text-blue-800';
      case 'fixed':
        return 'bg-purple-100 text-purple-800';
      case 'loyalty':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activePromotions = promotions.filter(p => p.isActive).length;
  const totalUsage = promotions.reduce((sum, p) => sum + p.usageCount, 0);
  const averageUsage = totalUsage / promotions.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Promotions & Offers</h1>
          <p className="text-muted-foreground">
            Create and manage special offers for your salon
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
              <DialogDescription>
                Set up a new promotion or offer for your customers
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePromotion} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Promotion Title</Label>
                  <Input id="title" placeholder="Enter promotion title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Promotion Code</Label>
                  <Input id="code" placeholder="e.g., SUMMER20" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your promotion" />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="loyalty">Loyalty Program</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" type="number" placeholder="20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Usage Limit</Label>
                  <Input id="limit" type="number" placeholder="100" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="conditions">Terms & Conditions</Label>
                <Textarea id="conditions" placeholder="Enter any specific conditions" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="active" defaultChecked />
                <Label htmlFor="active">Activate immediately</Label>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Create Promotion</Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Active Promotions"
          value={activePromotions}
          icon={Tag}
          trend={{ value: 25, isPositive: true }}
          description="currently running"
        />
        <StatsCard
          title="Total Usage"
          value={totalUsage}
          icon={Users}
          trend={{ value: 15.2, isPositive: true }}
          description="this month"
        />
        <StatsCard
          title="Average Usage"
          value={Math.round(averageUsage)}
          icon={Clock}
          trend={{ value: 8.1, isPositive: true }}
          description="per promotion"
        />
        <StatsCard
          title="Saved by Customers"
          value="$2,340"
          icon={DollarSign}
          trend={{ value: 12.3, isPositive: true }}
          description="total savings"
        />
      </div>

      {/* Promotions List */}
      <div className="grid gap-4">
        {promotions.map((promotion) => (
          <Card key={promotion.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{promotion.title}</CardTitle>
                    <Badge className={getStatusColor(promotion.isActive)}>
                      {promotion.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge className={getTypeColor(promotion.type)}>
                      {promotion.type}
                    </Badge>
                  </div>
                  <CardDescription>{promotion.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={promotion.isActive}
                    onCheckedChange={() => handleTogglePromotion(promotion.id)}
                  />
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Promotion Code</div>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {promotion.code}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(promotion.code)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Value</div>
                  <div className="font-medium">
                    {promotion.type === 'percentage' ? `${promotion.value}%` : 
                     promotion.type === 'fixed' ? `$${promotion.value}` : 
                     'Loyalty Program'}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Usage</div>
                  <div className="font-medium">
                    {promotion.usageCount}
                    {promotion.usageLimit && ` / ${promotion.usageLimit}`}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Valid Until</div>
                  <div className="font-medium">
                    {format(promotion.endDate, 'MMM dd, yyyy')}
                  </div>
                </div>
              </div>
              
              {promotion.conditions && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Terms & Conditions</div>
                  <div className="text-sm">{promotion.conditions}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Promotions;