
import { UserCheck, Plus, Mail, Phone, Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, StatusBadge } from "@/components/shared/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { StatsCard } from "@/components/shared/StatsCard";

// Mock staff data for the salon
const staffMembers = [
  {
    id: '1',
    name: 'Sarah Martinez',
    email: 'sarah@glamourstudio.com',
    phone: '+1 (555) 111-2222',
    role: 'Senior Stylist',
    specialties: ['Hair Cut', 'Hair Color', 'Highlights'],
    status: 'active',
    joinDate: '2023-01-15',
    monthlyAppointments: 24,
    monthlyRevenue: 1920,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Maria Lopez',
    email: 'maria@glamourstudio.com',
    phone: '+1 (555) 222-3333',
    role: 'Hair Colorist',
    specialties: ['Hair Color', 'Balayage', 'Highlights'],
    status: 'active',
    joinDate: '2023-03-20',
    monthlyAppointments: 22,
    monthlyRevenue: 1760,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Jennifer Kim',
    email: 'jennifer@glamourstudio.com',
    phone: '+1 (555) 333-4444',
    role: 'Nail Technician',
    specialties: ['Manicure', 'Pedicure', 'Nail Art'],
    status: 'active',
    joinDate: '2023-05-10',
    monthlyAppointments: 18,
    monthlyRevenue: 1440,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike@glamourstudio.com',
    phone: '+1 (555) 444-5555',
    role: 'Barber',
    specialties: ['Men\'s Cut', 'Beard Trim', 'Shave'],
    status: 'active',
    joinDate: '2023-07-01',
    monthlyAppointments: 15,
    monthlyRevenue: 1200,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Lisa Chen',
    email: 'lisa@glamourstudio.com',
    phone: '+1 (555) 555-6666',
    role: 'Esthetician',
    specialties: ['Facial', 'Skincare', 'Eyebrow Threading'],
    status: 'inactive',
    joinDate: '2023-09-15',
    monthlyAppointments: 0,
    monthlyRevenue: 0,
    rating: 4.5
  },
];

const staffColumns = [
  { key: 'name' as const, label: 'Name' },
  { key: 'role' as const, label: 'Role' },
  { key: 'email' as const, label: 'Email' },
  { key: 'phone' as const, label: 'Phone' },
  { key: 'monthlyAppointments' as const, label: 'Appointments', render: (value: number) => value.toString() },
  { key: 'monthlyRevenue' as const, label: 'Revenue', render: (value: number) => `$${value}` },
  { key: 'rating' as const, label: 'Rating', render: (value: number) => `${value}/5.0` },
  { key: 'status' as const, label: 'Status', render: (value: string) => <StatusBadge status={value} /> },
];

const Staff = () => {
  const { user } = useAuth();
  
  const activeStaff = staffMembers.filter(staff => staff.status === 'active').length;
  const totalRevenue = staffMembers.reduce((sum, staff) => sum + staff.monthlyRevenue, 0);
  const averageRating = staffMembers.reduce((sum, staff) => sum + staff.rating, 0) / staffMembers.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage your salon staff and their performance
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Active Staff"
          value={activeStaff}
          icon={UserCheck}
          trend={{ value: 0, isPositive: true }}
          description="team members"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={Calendar}
          trend={{ value: 15.2, isPositive: true }}
          description="this month"
        />
        <StatsCard
          title="Avg. Rating"
          value={averageRating.toFixed(1)}
          icon={UserCheck}
          trend={{ value: 2.3, isPositive: true }}
          description="customer rating"
        />
        <StatsCard
          title="Total Appointments"
          value={staffMembers.reduce((sum, staff) => sum + staff.monthlyAppointments, 0)}
          icon={Calendar}
          trend={{ value: 8.7, isPositive: true }}
          description="this month"
        />
      </div>

      {/* Staff Table */}
      <DataTable
        title="All Staff Members"
        data={staffMembers}
        columns={staffColumns}
        actions={(item) => (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="outline">
              <Calendar className="h-3 w-3 mr-1" />
              Schedule
            </Button>
            <Button size="sm" variant="destructive">
              <Trash2 className="h-3 w-3 mr-1" />
              Remove
            </Button>
          </div>
        )}
      />

      {/* Staff Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers This Month</CardTitle>
            <CardDescription>Staff members with highest revenue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {staffMembers
              .filter(staff => staff.status === 'active')
              .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
              .slice(0, 3)
              .map((staff, index) => (
                <div key={staff.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${staff.monthlyRevenue}</p>
                    <p className="text-sm text-muted-foreground">{staff.monthlyAppointments} appointments</p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Specialties</CardTitle>
            <CardDescription>Services covered by your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffMembers
                .filter(staff => staff.status === 'active')
                .map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {staff.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{staff.rating}/5.0</p>
                      <p className="text-xs text-muted-foreground">rating</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common staff management tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              View Staff Schedule
            </Button>
            <Button variant="outline" className="justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Send Team Update
            </Button>
            <Button variant="outline" className="justify-start">
              <UserCheck className="h-4 w-4 mr-2" />
              Performance Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staff;
