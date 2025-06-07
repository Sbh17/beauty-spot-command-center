
import { useState } from "react";
import { TrendingUp, TrendingDown, Star, Calendar, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StaffPerformance {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  monthlyStats: {
    appointments: number;
    revenue: number;
    rating: number;
    customerRetention: number;
    punctuality: number;
  };
  trends: {
    appointments: number;
    revenue: number;
    rating: number;
  };
  specialties: string[];
  certifications: string[];
}

const mockStaffPerformance: StaffPerformance[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    role: 'Senior Stylist',
    monthlyStats: {
      appointments: 24,
      revenue: 1920,
      rating: 4.9,
      customerRetention: 85,
      punctuality: 98
    },
    trends: {
      appointments: 12.5,
      revenue: 15.3,
      rating: 2.1
    },
    specialties: ['Hair Cut', 'Hair Color', 'Highlights'],
    certifications: ['Advanced Color Theory', 'Balayage Specialist']
  },
  {
    id: '2',
    name: 'Maria Lopez',
    role: 'Hair Colorist',
    monthlyStats: {
      appointments: 22,
      revenue: 1760,
      rating: 4.8,
      customerRetention: 78,
      punctuality: 95
    },
    trends: {
      appointments: 8.7,
      revenue: 11.2,
      rating: -1.2
    },
    specialties: ['Hair Color', 'Balayage', 'Highlights'],
    certifications: ['Color Correction Specialist']
  },
  {
    id: '3',
    name: 'Jennifer Kim',
    role: 'Nail Technician',
    monthlyStats: {
      appointments: 18,
      revenue: 1440,
      rating: 4.7,
      customerRetention: 92,
      punctuality: 100
    },
    trends: {
      appointments: -5.3,
      revenue: -2.1,
      rating: 5.7
    },
    specialties: ['Manicure', 'Pedicure', 'Nail Art'],
    certifications: ['Nail Art Specialist', 'Gel Polish Expert']
  }
];

export const StaffPerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedStaff, setSelectedStaff] = useState('all');

  const filteredStaff = selectedStaff === 'all' 
    ? mockStaffPerformance 
    : mockStaffPerformance.filter(staff => staff.id === selectedStaff);

  const renderTrend = (value: number) => {
    const isPositive = value >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <Icon className="h-3 w-3" />
        <span className="text-xs">{Math.abs(value).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Staff Performance</CardTitle>
            <CardDescription>Track and analyze team performance metrics</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStaff} onValueChange={setSelectedStaff}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                {mockStaffPerformance.map((staff) => (
                  <SelectItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredStaff.map((staff) => (
            <div key={staff.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-medium text-primary">{staff.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{staff.name}</h3>
                    <p className="text-sm text-muted-foreground">{staff.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{staff.monthlyStats.rating}</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid gap-4 md:grid-cols-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-lg font-semibold">{staff.monthlyStats.appointments}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Appointments</p>
                  {renderTrend(staff.trends.appointments)}
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-semibold">${staff.monthlyStats.revenue}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                  {renderTrend(staff.trends.revenue)}
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-lg font-semibold">{staff.monthlyStats.customerRetention}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Retention</p>
                  <Progress value={staff.monthlyStats.customerRetention} className="w-16 h-1" />
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span className="text-lg font-semibold">{staff.monthlyStats.punctuality}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Punctuality</p>
                  <Progress value={staff.monthlyStats.punctuality} className="w-16 h-1" />
                </div>
              </div>

              {/* Specialties and Certifications */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {staff.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {staff.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
