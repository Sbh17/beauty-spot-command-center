
import { DollarSign, Users, Calendar, TrendingUp, BarChart3, Clock } from "lucide-react";
import { StatsCard } from "@/components/shared/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useAuth } from "@/hooks/useAuth";

// Mock analytics data for salon owner
const salonStats = {
  monthlyRevenue: 12450,
  totalAppointments: 156,
  activeCustomers: 89,
  averageBookingValue: 79.8,
  revenueGrowth: 18.7,
  appointmentGrowth: 15.2,
  customerGrowth: 12.1,
  bookingValueGrowth: 5.3
};

const revenueData = [
  { month: "Jan", revenue: 8500, appointments: 110 },
  { month: "Feb", revenue: 9200, appointments: 125 },
  { month: "Mar", revenue: 10100, appointments: 135 },
  { month: "Apr", revenue: 11200, appointments: 148 },
  { month: "May", revenue: 12450, appointments: 156 },
];

const serviceData = [
  { service: "Hair Cut", bookings: 45, revenue: 2250 },
  { service: "Hair Color", bookings: 28, revenue: 3360 },
  { service: "Manicure", bookings: 35, revenue: 1750 },
  { service: "Pedicure", bookings: 22, revenue: 1320 },
  { service: "Facial", bookings: 18, revenue: 1800 },
  { service: "Massage", bookings: 8, revenue: 960 },
];

const customerRetention = [
  { name: "New Customers", value: 35, color: "#3b82f6" },
  { name: "Returning", value: 45, color: "#10b981" },
  { name: "Regular", value: 20, color: "#f59e0b" },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  appointments: {
    label: "Appointments",
    color: "hsl(142 71% 45%)",
  },
};

const Analytics = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track your salon's performance and growth metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Monthly Revenue"
          value={`$${salonStats.monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: salonStats.revenueGrowth, isPositive: true }}
          description="vs last month"
        />
        <StatsCard
          title="Total Appointments"
          value={salonStats.totalAppointments}
          icon={Calendar}
          trend={{ value: salonStats.appointmentGrowth, isPositive: true }}
          description="this month"
        />
        <StatsCard
          title="Active Customers"
          value={salonStats.activeCustomers}
          icon={Users}
          trend={{ value: salonStats.customerGrowth, isPositive: true }}
          description="monthly growth"
        />
        <StatsCard
          title="Avg. Booking Value"
          value={`$${salonStats.averageBookingValue}`}
          icon={TrendingUp}
          trend={{ value: salonStats.bookingValueGrowth, isPositive: true }}
          description="per appointment"
        />
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Appointments Trend</CardTitle>
          <CardDescription>Monthly performance over the last 5 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="appointments"
                  stroke="var(--color-appointments)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Service Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
            <CardDescription>Bookings and revenue by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bookings" fill="var(--color-revenue)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Retention */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Distribution</CardTitle>
            <CardDescription>New vs returning customers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerRetention}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {customerRetention.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Services</CardTitle>
            <CardDescription>Most popular services this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {serviceData.slice(0, 3).map((service, index) => (
              <div key={service.service} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{service.service}</p>
                    <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                  </div>
                </div>
                <span className="font-semibold">${service.revenue}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key business indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Customer Satisfaction</span>
              <span className="text-sm font-semibold text-green-600">4.8/5.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Booking Conversion</span>
              <span className="text-sm font-semibold">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Average Wait Time</span>
              <span className="text-sm font-medium">12 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">No-Show Rate</span>
              <span className="text-sm font-medium text-red-600">5.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
            <CardDescription>Top performing staff members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Sarah Martinez", bookings: 24, revenue: 1920 },
              { name: "Maria Lopez", bookings: 22, revenue: 1760 },
              { name: "Jennifer Kim", bookings: 18, revenue: 1440 }
            ].map((staff, index) => (
              <div key={staff.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-700">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{staff.name}</p>
                    <p className="text-sm text-muted-foreground">{staff.bookings} appointments</p>
                  </div>
                </div>
                <span className="font-semibold">${staff.revenue}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
