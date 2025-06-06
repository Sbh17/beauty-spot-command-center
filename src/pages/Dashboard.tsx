import { Users, Building2, Calendar, DollarSign, TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";
import { StatsCard } from "@/components/shared/StatsCard";
import { DataTable, StatusBadge } from "@/components/shared/DataTable";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";

// Mock data with performance metrics
const adminStats = {
  totalUsers: 1234,
  totalSalons: 89,
  totalBookings: 5678,
  totalRevenue: 45890,
  userGrowth: 12.5,
  salonGrowth: 8.3,
  bookingGrowth: 15.2,
  revenueGrowth: 18.7,
  responseTime: 142,
  uptime: 99.9
};

const ownerStats = {
  totalBookings: 156,
  totalRevenue: 4890,
  totalCustomers: 89,
  averageRating: 4.8,
  bookingGrowth: 15.2,
  revenueGrowth: 18.7,
  customerGrowth: 12.1,
  ratingGrowth: 2.3
};

// Dynamic chart data
const weeklyPerformance = [
  { day: "Mon", bookings: 45, revenue: 2340 },
  { day: "Tue", bookings: 52, revenue: 2890 },
  { day: "Wed", bookings: 48, revenue: 2456 },
  { day: "Thu", bookings: 61, revenue: 3210 },
  { day: "Fri", bookings: 74, revenue: 3890 },
  { day: "Sat", bookings: 89, revenue: 4567 },
  { day: "Sun", bookings: 67, revenue: 3456 },
];

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--primary))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(142 71% 45%)",
  },
};

// Mock data
const recentUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'customer', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@salon.com', role: 'owner', status: 'pending', createdAt: '2024-01-14' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com', role: 'customer', status: 'active', createdAt: '2024-01-13' },
];

const recentAppointments = [
  { id: '1', customer: 'Alice Johnson', service: 'Hair Cut', date: '2024-01-20', time: '10:00 AM', status: 'scheduled', amount: 50 },
  { id: '2', customer: 'Bob Smith', service: 'Manicure', date: '2024-01-19', time: '2:00 PM', status: 'completed', amount: 35 },
  { id: '3', customer: 'Carol Davis', service: 'Facial', date: '2024-01-18', time: '11:30 AM', status: 'completed', amount: 75 },
];

const userColumns = [
  { key: 'name' as const, label: 'Name' },
  { key: 'email' as const, label: 'Email' },
  { key: 'role' as const, label: 'Role', render: (value: string) => <Badge variant="outline">{value}</Badge> },
  { key: 'status' as const, label: 'Status', render: (value: string) => <StatusBadge status={value} /> },
  { key: 'createdAt' as const, label: 'Created', render: (value: string) => new Date(value).toLocaleDateString() },
];

const appointmentColumns = [
  { key: 'customer' as const, label: 'Customer' },
  { key: 'service' as const, label: 'Service' },
  { key: 'date' as const, label: 'Date', render: (value: string) => new Date(value).toLocaleDateString() },
  { key: 'time' as const, label: 'Time' },
  { key: 'status' as const, label: 'Status', render: (value: string) => <StatusBadge status={value} /> },
  { key: 'amount' as const, label: 'Amount', render: (value: number) => `$${value}` },
];

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Here's your {isAdmin ? 'platform' : 'business'} performance overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Activity className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isAdmin ? (
          <>
            <StatsCard
              title="Total Users"
              value={adminStats.totalUsers.toLocaleString()}
              icon={Users}
              trend={{ value: adminStats.userGrowth, isPositive: true }}
              description="monthly growth"
            />
            <StatsCard
              title="Total Salons"
              value={adminStats.totalSalons}
              icon={Building2}
              trend={{ value: adminStats.salonGrowth, isPositive: true }}
              description="active salons"
            />
            <StatsCard
              title="Total Bookings"
              value={adminStats.totalBookings.toLocaleString()}
              icon={Calendar}
              trend={{ value: adminStats.bookingGrowth, isPositive: true }}
              description="this month"
            />
            <StatsCard
              title="Response Time"
              value={`${adminStats.responseTime}ms`}
              icon={Clock}
              trend={{ value: 5.2, isPositive: false }}
              description="avg response"
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Bookings"
              value={ownerStats.totalBookings}
              icon={Calendar}
              trend={{ value: ownerStats.bookingGrowth, isPositive: true }}
              description="this month"
            />
            <StatsCard
              title="Total Revenue"
              value={`$${ownerStats.totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              trend={{ value: ownerStats.revenueGrowth, isPositive: true }}
              description="monthly growth"
            />
            <StatsCard
              title="Total Customers"
              value={ownerStats.totalCustomers}
              icon={Users}
              trend={{ value: ownerStats.customerGrowth, isPositive: true }}
              description="active customers"
            />
            <StatsCard
              title="Average Rating"
              value={ownerStats.averageRating}
              icon={TrendingUp}
              trend={{ value: ownerStats.ratingGrowth, isPositive: true }}
              description="customer rating"
            />
          </>
        )}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance</CardTitle>
          <CardDescription>
            {isAdmin ? "Platform-wide bookings and revenue" : "Your salon's bookings and revenue"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookings"
                  stackId="1"
                  stroke="var(--color-bookings)"
                  fill="var(--color-bookings)"
                  fillOpacity={0.6}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {isAdmin ? (
          <>
            <DataTable
              title="Recent Users"
              data={recentUsers}
              columns={userColumns}
            />
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Real-time system metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">System Uptime</span>
                  <span className="text-sm font-semibold text-green-600">{adminStats.uptime}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending Approvals</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Revenue Growth</span>
                  <span className="text-sm font-semibold text-green-600">+{adminStats.revenueGrowth}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-sm font-medium">4.6/5.0</span>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <DataTable
              title="Recent Appointments"
              data={recentAppointments}
              columns={appointmentColumns}
            />
            <Card>
              <CardHeader>
                <CardTitle>Business Overview</CardTitle>
                <CardDescription>Your salon performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Today's Appointments</span>
                  <span className="text-sm text-muted-foreground">8 scheduled</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Staff Available</span>
                  <span className="text-sm text-green-600">5 of 6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">This Week's Revenue</span>
                  <span className="text-sm font-semibold text-green-600">$1,245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Customer Rating</span>
                  <span className="text-sm font-medium">{ownerStats.averageRating}/5.0</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
