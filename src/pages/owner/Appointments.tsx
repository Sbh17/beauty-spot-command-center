
import { Calendar, Check, X, Clock, DollarSign, Filter, Search, User, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, StatusBadge } from "@/components/shared/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { StatsCard } from "@/components/shared/StatsCard";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { format, addHours, startOfDay, isSameDay } from "date-fns";

// Mock data for appointments with more realistic today's appointments
const appointments = [
  { 
    id: '1', 
    customer: 'Alice Johnson', 
    service: 'Hair Cut & Style', 
    date: format(new Date(), 'yyyy-MM-dd'), 
    time: '09:00',
    status: 'confirmed', 
    amount: 75,
    staff: 'Sarah Martinez',
    phone: '+1 (555) 123-4567',
    duration: 60
  },
  { 
    id: '2', 
    customer: 'Bob Wilson', 
    service: 'Hair Color', 
    date: format(new Date(), 'yyyy-MM-dd'), 
    time: '10:30',
    status: 'confirmed', 
    amount: 120,
    staff: 'Maria Lopez',
    phone: '+1 (555) 234-5678',
    duration: 90
  },
  { 
    id: '3', 
    customer: 'Carol Davis', 
    service: 'Manicure + Pedicure', 
    date: format(new Date(), 'yyyy-MM-dd'), 
    time: '14:00',
    status: 'pending', 
    amount: 65,
    staff: 'Jennifer Kim',
    phone: '+1 (555) 345-6789',
    duration: 45
  },
  { 
    id: '4', 
    customer: 'David Brown', 
    service: 'Beard Trim', 
    date: format(new Date(), 'yyyy-MM-dd'), 
    time: '15:30',
    status: 'confirmed', 
    amount: 35,
    staff: 'Mike Johnson',
    phone: '+1 (555) 456-7890',
    duration: 30
  },
  { 
    id: '5', 
    customer: 'Emma Wilson', 
    service: 'Facial Treatment', 
    date: format(new Date(), 'yyyy-MM-dd'), 
    time: '11:00',
    status: 'completed', 
    amount: 85,
    staff: 'Sarah Martinez',
    phone: '+1 (555) 567-8901',
    duration: 60
  },
  { 
    id: '6', 
    customer: 'Frank Miller', 
    service: 'Massage', 
    date: format(new Date(), 'yyyy-MM-dd'), 
    time: '16:00',
    status: 'confirmed', 
    amount: 90,
    staff: 'Maria Lopez',
    phone: '+1 (555) 678-9012',
    duration: 50
  },
];

// Hour slots for the schedule (9 AM to 6 PM)
const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const Appointments = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Filter appointments for today
  const todayAppointments = appointments.filter(apt => apt.date === today);
  
  const pendingCount = todayAppointments.filter(apt => apt.status === 'pending').length;
  const todayRevenue = todayAppointments
    .filter(apt => apt.status === 'completed')
    .reduce((sum, apt) => sum + apt.amount, 0);
  const confirmedToday = todayAppointments.filter(apt => apt.status === 'confirmed').length;

  const handleApprove = (appointmentId: string) => {
    console.log('Approving appointment:', appointmentId);
    // Implement approval logic
  };

  const handleReject = (appointmentId: string) => {
    console.log('Rejecting appointment:', appointmentId);
    // Implement rejection logic
  };

  // Get appointments for a specific time slot
  const getAppointmentsForSlot = (timeSlot: string) => {
    return todayAppointments.filter(apt => {
      const aptTime = apt.time;
      const slotHour = parseInt(timeSlot.split(':')[0]);
      const aptHour = parseInt(aptTime.split(':')[0]);
      const aptMinute = parseInt(aptTime.split(':')[1]);
      
      // Check if appointment falls within this hour slot
      return aptHour === slotHour || (aptHour === slotHour - 1 && aptMinute >= 30);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'pending':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Today's Appointments</h1>
          <p className="text-muted-foreground">
            {format(new Date(), 'EEEE, MMMM do, yyyy')}
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
          value={todayAppointments.length}
          icon={Calendar}
          trend={{ value: 5.1, isPositive: true }}
          description="all appointments"
        />
      </div>

      {/* Hourly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Schedule</CardTitle>
          <CardDescription>Today's appointments organized by time slots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {timeSlots.map((timeSlot) => {
              const slotAppointments = getAppointmentsForSlot(timeSlot);
              const hour = parseInt(timeSlot.split(':')[0]);
              const displayTime = hour <= 12 ? 
                `${hour === 0 ? 12 : hour}:00 ${hour < 12 ? 'AM' : 'PM'}` : 
                `${hour - 12}:00 PM`;
              
              return (
                <div key={timeSlot} className="border rounded-lg p-4 bg-muted/20">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Time Slot Header */}
                    <div className="lg:w-24 flex-shrink-0">
                      <div className="text-lg font-semibold text-primary">
                        {displayTime}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {slotAppointments.length} appointment{slotAppointments.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    
                    {/* Appointments for this slot */}
                    <div className="flex-1">
                      {slotAppointments.length === 0 ? (
                        <div className="text-muted-foreground italic p-4 text-center border-2 border-dashed rounded-lg">
                          No appointments scheduled
                        </div>
                      ) : (
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {slotAppointments.map((apt) => (
                            <div
                              key={apt.id}
                              className={`p-3 rounded-lg border-2 ${getStatusColor(apt.status)} transition-all duration-200 hover:shadow-md`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{apt.time}</div>
                                  <div className="font-semibold">{apt.customer}</div>
                                </div>
                                <Badge variant={apt.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                                  {apt.status}
                                </Badge>
                              </div>
                              
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{apt.service}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span>{apt.staff}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  <span>${apt.amount}</span>
                                </div>
                              </div>
                              
                              {/* Action buttons */}
                              <div className="flex gap-2 mt-3">
                                {apt.status === 'pending' && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      variant="default"
                                      onClick={() => handleApprove(apt.id)}
                                      className="flex-1 text-xs"
                                    >
                                      <Check className="h-3 w-3 mr-1" />
                                      Approve
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => handleReject(apt.id)}
                                      className="flex-1 text-xs"
                                    >
                                      <X className="h-3 w-3 mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                )}
                                {apt.status === 'confirmed' && (
                                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                                    <Phone className="h-3 w-3 mr-1" />
                                    Call
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Appointments waiting for your approval</CardDescription>
          </CardHeader>
          <CardContent>
            {todayAppointments.filter(apt => apt.status === 'pending').length === 0 ? (
              <div className="text-muted-foreground italic text-center p-4">
                No pending appointments
              </div>
            ) : (
              <div className="space-y-3">
                {todayAppointments.filter(apt => apt.status === 'pending').map((apt) => (
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
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
            <CardDescription>Today's financial overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-semibold">
                  ${todayAppointments.filter(apt => apt.status === 'completed').reduce((sum, apt) => sum + apt.amount, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Confirmed</span>
                <span className="font-semibold">
                  ${todayAppointments.filter(apt => apt.status === 'confirmed').reduce((sum, apt) => sum + apt.amount, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="font-semibold">
                  ${todayAppointments.filter(apt => apt.status === 'pending').reduce((sum, apt) => sum + apt.amount, 0)}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Potential</span>
                  <span className="font-bold text-lg">
                    ${todayAppointments.reduce((sum, apt) => sum + apt.amount, 0)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointments;
