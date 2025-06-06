
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Building2, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/shared/StatsCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

// Dynamic chart data
const revenueData = [
  { month: "Jan", revenue: 125000, bookings: 450 },
  { month: "Feb", revenue: 138000, bookings: 520 },
  { month: "Mar", revenue: 142000, bookings: 580 },
  { month: "Apr", revenue: 155000, bookings: 640 },
  { month: "May", revenue: 168000, bookings: 720 },
  { month: "Jun", revenue: 156789, bookings: 680 },
];

const userGrowthData = [
  { week: "W1", users: 980, active: 750 },
  { week: "W2", users: 1050, active: 820 },
  { week: "W3", users: 1120, active: 890 },
  { week: "W4", users: 1234, active: 945 },
];

const salonPerformanceData = [
  { name: "Radiant Salon", revenue: 15600, bookings: 89, rating: 4.8 },
  { name: "Glamour Studio", revenue: 12500, bookings: 76, rating: 4.6 },
  { name: "Style Central", revenue: 11200, bookings: 68, rating: 4.7 },
  { name: "Beauty Haven", revenue: 8900, bookings: 52, rating: 4.5 },
  { name: "Elite Cuts", revenue: 7800, bookings: 45, rating: 4.4 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  bookings: {
    label: "Bookings",
    color: "hsl(var(--secondary))",
  },
  users: {
    label: "Total Users",
    color: "hsl(var(--primary))",
  },
  active: {
    label: "Active Users",
    color: "hsl(142 71% 45%)",
  },
};

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Analytics</h1>
        <p className="text-muted-foreground">Real-time insights into platform performance and growth</p>
      </div>

      {/* Performance Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$156,789"
          icon={DollarSign}
          trend={{ value: 18.7, isPositive: true }}
          description="vs last month"
        />
        <StatsCard
          title="Active Users"
          value="1,234"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          description="monthly active"
        />
        <StatsCard
          title="Active Salons"
          value="89"
          icon={Building2}
          trend={{ value: 8.3, isPositive: true }}
          description="verified salons"
        />
        <StatsCard
          title="Avg Response Time"
          value="142ms"
          icon={Activity}
          trend={{ value: 5.2, isPositive: false }}
          description="server response"
        />
      </div>

      {/* Revenue & Bookings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Bookings Trend</CardTitle>
          <CardDescription>Monthly revenue and booking statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="var(--color-revenue)"
                  fill="var(--color-revenue)"
                  fillOpacity={0.6}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="bookings"
                  stackId="2"
                  stroke="var(--color-bookings)"
                  fill="var(--color-bookings)"
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Weekly user acquisition and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="var(--color-users)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-users)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="var(--color-active)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-active)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Salon Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Salon Performance</CardTitle>
            <CardDescription>Revenue comparison across salons</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salonPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>System performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Uptime</span>
              <span className="text-sm font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">API Response Time</span>
              <span className="text-sm text-muted-foreground">142ms avg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Error Rate</span>
              <span className="text-sm text-green-600">0.1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active Sessions</span>
              <span className="text-sm font-semibold">789</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Conversion Rate</span>
              <span className="text-sm font-semibold text-green-600">8.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Customer Retention</span>
              <span className="text-sm font-semibold">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Avg. Booking Value</span>
              <span className="text-sm text-muted-foreground">$78</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Churn Rate</span>
              <span className="text-sm text-green-600">2.3%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Insights</CardTitle>
            <CardDescription>Top performing regions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">New York</span>
              <span className="text-sm text-muted-foreground">342 users</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Los Angeles</span>
              <span className="text-sm text-muted-foreground">287 users</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Chicago</span>
              <span className="text-sm text-muted-foreground">201 users</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Miami</span>
              <span className="text-sm text-muted-foreground">156 users</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
