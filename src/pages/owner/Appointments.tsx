
import { Calendar, Check, X, Clock, DollarSign, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, StatusBadge } from "@/components/shared/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { StatsCard } from "@/components/shared/StatsCard";
import { Badge } from "@/components/ui/badge";

// Mock data for appointments specific to the salon
const appointments = [
  { 
    id: '1', 
    customer: 'Alice Johnson', 
    service: 'Hair Cut & Style', 
    date: '2024-01-20', 
    time: '10:00 AM',
    status: 'pending', 
    amount: 75,
    staff: 'Sarah Martinez',
    phone: '+1 (555) 123-4567'
  },
  { 
    id: '2', 
    customer: 'Bob Wilson', 
    service: 'Hair Color', 
    date: '2024-01-20', 
    time: '2:00 PM',
    status: 'confirmed', 
    amount: 120,
    staff: 'Maria Lopez',
    phone: '+1 (555) 234-5678'
  },
  { 
    id: '3', 
    customer: 'Carol Davis', 
    service: 'Manicure + Pedicure', 
    date: '2024-01-21', 
    time: '11:30 AM',
    status: 'completed', 
    amount: 65,
    staff: 'Jennifer Kim',
    phone: '+1 (555) 345-6789'
  },
  { 
    id: '4', 
    customer: 'David Brown', 
    service: 'Beard Trim', 
    date: '2024-01-21', 
    time: '3:00 PM',
    status: 'pending', 
    amount: 35,
    staff: 'Mike Johnson',
    phone: '+1 (555) 456-7890'
  },
];

const appointmentColumns = [
  { key: 'customer' as const, label: 'Customer' },
  { key: 'service' as const, label: 'Service' },
  { key: 'staff' as const, label: 'Staff' },
  { key: 'date' as const, label: 'Date', render: (value: string) => new Date(value).toLocaleDateString() },
  { key: 'time' as const, label: 'Time' },
  { key: 'status' as const, label: 'Status', render: (value: string) => <StatusBadge status={value} /> },
  { key: 'amount' as const, label: 'Amount', render: (value: number) => `$${value}` },
];

const Appointments = () => {
  const { user } = useAuth();
  
  const pendingCount = appointments.filter(apt => apt.status === 'pending').length;
  const todayRevenue = appointments
    .filter(apt => apt.date === '2024-01-20' && apt.status === 'completed')
    .reduce((sum, apt) => sum + apt.amount, 0);
  const confirmedToday = appointments.filter(apt => apt.date === '2024-01-20' && apt.status === 'confirmed').length;

  const handleApprove = (appointmentId: string) => {
    console.log('Approving appointment:', appointmentId);
    // Implement approval logic
  };

  const handleReject = (appointmentId: string) => {
    console.log('Rejecting appointment:', appointmentId);
    // Implement rejection logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">
            Manage your salon appointments and bookings
          </p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Add Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Pending Approvals"
          value={pendingCount}
          icon={Clock}
          trend={{ value: 12.5, isPositive: false }}
          description="requiring action"
        />
        <StatsCard
          title="Today's Revenue"
          value={`$${todayRevenue}`}
          icon={DollarSign}
          trend={{ value: 8.3, isPositive: true }}
          description="completed bookings"
        />
        <StatsCard
          title="Confirmed Today"
          value={confirmedToday}
          icon={Check}
          trend={{ value: 15.2, isPositive: true }}
          description="appointments"
        />
        <StatsCard
          title="Total Today"
          value={appointments.filter(apt => apt.date === '2024-01-20').length}
          icon={Calendar}
          trend={{ value: 5.1, isPositive: true }}
          description="all appointments"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input placeholder="Search customers..." />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <DataTable
        title="All Appointments"
        data={appointments}
        columns={appointmentColumns}
        actions={(item) => (
          <div className="flex gap-2">
            {item.status === 'pending' && (
              <>
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => handleApprove(item.id)}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleReject(item.id)}
                >
                  <X className="h-3 w-3 mr-1" />
                  Reject
                </Button>
              </>
            )}
            {item.status === 'confirmed' && (
              <Button size="sm" variant="outline">
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            )}
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        )}
      />

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Appointments waiting for your approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {appointments.filter(apt => apt.status === 'pending').map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{apt.customer}</p>
                  <p className="text-sm text-muted-foreground">{apt.service} - {apt.time}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(apt.id)}>
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleReject(apt.id)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Overview of today's appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {appointments
              .filter(apt => apt.date === '2024-01-20')
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{apt.time} - {apt.customer}</p>
                    <p className="text-sm text-muted-foreground">{apt.service}</p>
                  </div>
                  <Badge variant={apt.status === 'confirmed' ? 'default' : 'secondary'}>
                    {apt.status}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointments;
