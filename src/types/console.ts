
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'owner' | 'customer';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
}

export interface Salon {
  id: string;
  name: string;
  owner: string;
  location: string;
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  totalBookings: number;
  revenue: number;
  createdAt: string;
}

export interface Appointment {
  id: string;
  customer: string;
  salon: string;
  service: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  amount: number;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  salon: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalBookings: number;
  totalUsers: number;
  totalSalons: number;
  revenueGrowth: number;
  bookingsGrowth: number;
  userGrowth: number;
  salonGrowth: number;
}

export type UserRole = 'admin' | 'owner' | 'customer';
