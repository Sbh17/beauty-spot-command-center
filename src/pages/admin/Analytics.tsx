
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/shared/StatsCard";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into platform performance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$156,789"
          icon={DollarSign}
          trend={{ value: 18.7, isPositive: true }}
        />
        <StatsCard
          title="Active Users"
          value="1,234"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Active Salons"
          value="89"
          icon={Building2}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatsCard
          title="Booking Rate"
          value="87%"
          icon={TrendingUp}
          trend={{ value: 5.2, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">This Month</span>
              <span className="text-sm font-semibold text-green-600">$45,890</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Last Month</span>
              <span className="text-sm text-muted-foreground">$38,650</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Growth Rate</span>
              <span className="text-sm font-semibold text-green-600">+18.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Platform Fee</span>
              <span className="text-sm text-muted-foreground">$4,589</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>Platform usage statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Daily Active Users</span>
              <span className="text-sm font-semibold">789</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Weekly Active Users</span>
              <span className="text-sm font-semibold">1,156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Session Duration</span>
              <span className="text-sm text-muted-foreground">12.5 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Bounce Rate</span>
              <span className="text-sm text-muted-foreground">23%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Salons</CardTitle>
            <CardDescription>Highest revenue generators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Radiant Salon</span>
              <span className="text-sm font-semibold">$15,600</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Glamour Studio</span>
              <span className="text-sm font-semibold">$12,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Style Central</span>
              <span className="text-sm font-semibold">$11,200</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Beauty Haven</span>
              <span className="text-sm font-semibold">$8,900</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Users by location</CardDescription>
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
