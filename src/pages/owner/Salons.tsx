
import { Building2, MapPin, Star, Users, Calendar, Settings, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { StatsCard } from "@/components/shared/StatsCard";

// Mock salon data based on user's salon access
const salonDetails = {
  'salon-1': {
    id: 'salon-1',
    name: 'Glamour Studio',
    address: '123 Fashion Ave, Manhattan, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'info@glamourstudio.com',
    description: 'Premium hair and beauty salon offering cutting-edge styles and treatments.',
    rating: 4.8,
    totalReviews: 247,
    totalStaff: 6,
    monthlyAppointments: 156,
    monthlyRevenue: 12450,
    services: ['Hair Cut', 'Hair Color', 'Highlights', 'Manicure', 'Pedicure', 'Facial'],
    workingHours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '8:00 AM - 7:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    }
  },
  'salon-2': {
    id: 'salon-2',
    name: 'Beauty Haven',
    address: '456 Style Street, Brooklyn, NY 11201',
    phone: '+1 (555) 234-5678',
    email: 'hello@beautyhaven.com',
    description: 'Modern beauty destination specializing in natural and organic treatments.',
    rating: 4.6,
    totalReviews: 189,
    totalStaff: 4,
    monthlyAppointments: 89,
    monthlyRevenue: 7890,
    services: ['Organic Facial', 'Natural Hair Care', 'Massage', 'Aromatherapy'],
    workingHours: {
      monday: '10:00 AM - 7:00 PM',
      tuesday: '10:00 AM - 7:00 PM',
      wednesday: '10:00 AM - 7:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed'
    }
  }
};

const Salons = () => {
  const { user } = useAuth();
  const userSalons = user?.salonIds?.map(id => salonDetails[id as keyof typeof salonDetails]).filter(Boolean) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Salons</h1>
          <p className="text-muted-foreground">
            Manage your salon information and settings
          </p>
        </div>
        <Button>
          <Building2 className="h-4 w-4 mr-2" />
          Add New Salon
        </Button>
      </div>

      {userSalons.map((salon) => (
        <div key={salon.id} className="space-y-6">
          {/* Salon Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{salon.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {salon.address}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{salon.rating}</span>
                        <span className="text-muted-foreground">({salon.totalReviews} reviews)</span>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Salon
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{salon.description}</p>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="font-medium mb-2">Contact Information</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Phone: {salon.phone}</p>
                    <p>Email: {salon.email}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Services Offered</p>
                  <div className="flex flex-wrap gap-1">
                    {salon.services.slice(0, 4).map((service) => (
                      <Badge key={service} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {salon.services.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{salon.services.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Quick Stats</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{salon.totalStaff} Staff Members</p>
                    <p>{salon.monthlyAppointments} Monthly Appointments</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salon Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <StatsCard
              title="Monthly Revenue"
              value={`$${salon.monthlyRevenue.toLocaleString()}`}
              icon={Building2}
              trend={{ value: 18.7, isPositive: true }}
              description="vs last month"
            />
            <StatsCard
              title="Appointments"
              value={salon.monthlyAppointments}
              icon={Calendar}
              trend={{ value: 15.2, isPositive: true }}
              description="this month"
            />
            <StatsCard
              title="Staff Members"
              value={salon.totalStaff}
              icon={Users}
              trend={{ value: 0, isPositive: true }}
              description="active staff"
            />
            <StatsCard
              title="Customer Rating"
              value={salon.rating}
              icon={Star}
              trend={{ value: 2.1, isPositive: true }}
              description="average rating"
            />
          </div>

          {/* Working Hours & Services */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Working Hours</CardTitle>
                <CardDescription>Current business hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(salon.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="font-medium capitalize">{day}</span>
                    <span className="text-muted-foreground">{hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Services</CardTitle>
                <CardDescription>Services offered at this salon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {salon.services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}

      {userSalons.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Salons Found</h3>
            <p className="text-muted-foreground text-center mb-4">
              You don't have access to any salons yet. Contact an administrator or add a new salon.
            </p>
            <Button>
              <Building2 className="h-4 w-4 mr-2" />
              Add Your First Salon
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Salons;
