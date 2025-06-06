
import { Building2, Plus, Search, Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, StatusBadge } from "@/components/shared/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for salons
const salons = [
  { id: '1', name: 'Glamour Studio', owner: 'Alice Johnson', location: 'New York, NY', status: 'active', services: 15, rating: 4.8, revenue: 12500 },
  { id: '2', name: 'Beauty Haven', owner: 'Bob Smith', location: 'Los Angeles, CA', status: 'pending', services: 12, rating: 4.6, revenue: 8900 },
  { id: '3', name: 'Radiant Salon', owner: 'Carol Davis', location: 'Chicago, IL', status: 'active', services: 20, rating: 4.9, revenue: 15600 },
  { id: '4', name: 'Pure Elegance', owner: 'David Wilson', location: 'Miami, FL', status: 'inactive', services: 8, rating: 4.2, revenue: 5400 },
  { id: '5', name: 'Style Central', owner: 'Eva Brown', location: 'Seattle, WA', status: 'active', services: 18, rating: 4.7, revenue: 11200 },
];

const salonColumns = [
  { key: 'name' as const, label: 'Salon Name' },
  { key: 'owner' as const, label: 'Owner' },
  { key: 'location' as const, label: 'Location', render: (value: string) => (
    <div className="flex items-center">
      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
      {value}
    </div>
  )},
  { key: 'status' as const, label: 'Status', render: (value: string) => <StatusBadge status={value} /> },
  { key: 'services' as const, label: 'Services' },
  { key: 'rating' as const, label: 'Rating', render: (value: number) => `${value}/5.0` },
  { key: 'revenue' as const, label: 'Revenue', render: (value: number) => `$${value.toLocaleString()}` },
];

const Salons = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Salon Management</h1>
          <p className="text-muted-foreground">Manage all salons on the platform</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Salon
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Salons</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Salons</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">88% operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">Platform average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Salons</CardTitle>
          <CardDescription>Complete list of platform salons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search salons..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <DataTable
            data={salons}
            columns={salonColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Salons;
