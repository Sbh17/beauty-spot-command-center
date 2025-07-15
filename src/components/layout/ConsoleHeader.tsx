
import { Bell, Search, LogOut, Home, BarChart3, Building2, Calendar, Users, UserCheck, ClipboardList, TrendingUp, Settings, ChevronDown, Tag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SalonSelector } from "@/components/auth/SalonSelector";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

const adminMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Salons",
    url: "/admin/salons",
    icon: Building2,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Requests",
    url: "/admin/requests",
    icon: ClipboardList,
    badge: "3"
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

const ownerMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "My Salons",
    url: "/owner/salons",
    icon: Building2,
  },
  {
    title: "Appointments",
    url: "/owner/appointments",
    icon: Calendar,
  },
  {
    title: "Staff",
    url: "/owner/staff",
    icon: UserCheck,
  },
  {
    title: "Promotions",
    url: "/owner/promotions",
    icon: Tag,
  },
  {
    title: "Analytics",
    url: "/owner/analytics",
    icon: TrendingUp,
  },
  {
    title: "Profile",
    url: "/owner/profile",
    icon: Settings,
  },
];

export const ConsoleHeader = () => {
  const { user, logout, isAdmin, isSalonOwner } = useAuth();
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);
  const menuItems = isAdmin ? adminMenuItems : ownerMenuItems;

  return (
    <header className={`border-b border-border/20 bg-primary elegant-shadow transition-all duration-300 ${
      isMinimized ? 'h-12' : 'h-20'
    }`}>
      <div className={`flex items-center gap-6 px-8 ${isMinimized ? 'h-12' : 'h-20'}`}>
        {/* Minimize Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMinimized(!isMinimized)}
          className="h-8 w-8 hover:bg-white/10 transition-all duration-300 rounded-lg text-white"
        >
          {isMinimized ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>

        {!isMinimized ? (
          <>
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/36c651de-4416-4bd1-929a-099e914b36cd.png" 
                  alt="HAIB Logo" 
                  className="w-8 h-8 object-contain"
                />
                <div className="luxury-text text-white text-lg tracking-[0.3em]">
                  HAIB
                </div>
              </div>
              
              {/* Salon Selector for multi-salon owners */}
              {isSalonOwner && (
                <div className="ml-6">
                  <SalonSelector />
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 luxury-text text-sm tracking-wide ${
                      location.pathname === item.url
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge className="bg-white text-primary text-xs px-2 py-0.5">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                <Input 
                  placeholder="Search..." 
                  className="pl-12 w-64 h-10 border-white/20 bg-white/10 text-white placeholder:text-white/60 luxury-text text-sm tracking-wide"
                />
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-10 w-10 hover:bg-white/10 transition-all duration-300 rounded-lg text-white"
                onClick={() => {
                  // Add notification functionality here
                  console.log('Notification clicked');
                }}
              >
                <Bell className="h-5 w-5" />
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-white text-primary border-0"
                >
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-3 h-10 px-4 hover:bg-white/10 transition-all duration-300 rounded-lg text-white"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm luxury-text font-medium">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm luxury-text tracking-wide font-medium">
                        {user?.name || 'User'}
                      </span>
                      <span className="text-xs text-white/60 luxury-text tracking-wider capitalize">
                        {user?.role || 'user'}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 border-border bg-card shadow-lg z-50"
                >
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="text-destructive hover:bg-destructive/10 transition-colors duration-300 luxury-text tracking-wide cursor-pointer"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            {/* Minimized Header Content */}
            <div className="flex items-center gap-4 flex-1">
              <img 
                src="/lovable-uploads/36c651de-4416-4bd1-929a-099e914b36cd.png" 
                alt="HAIB Logo" 
                className="w-6 h-6 object-contain"
              />
              <div className="luxury-text text-white text-sm tracking-[0.3em]">
                HAIB
              </div>
            </div>
            
            {/* Minimized Navigation - Only Icons */}
            <div className="flex items-center gap-1">
              {menuItems.slice(0, 5).map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                    location.pathname === item.url
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                  title={item.title}
                >
                  <item.icon className="h-4 w-4" />
                  {item.badge && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-white text-primary border-0">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>

            {/* Minimized Right Side */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-8 w-8 hover:bg-white/10 transition-all duration-300 rounded-lg text-white"
                onClick={() => {
                  // Add notification functionality here
                  console.log('Notification clicked');
                }}
              >
                <Bell className="h-4 w-4" />
                <Badge 
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-white text-primary border-0"
                >
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 hover:bg-white/10 transition-all duration-300 rounded-lg text-white"
                  >
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-primary text-xs luxury-text font-medium">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 border-border bg-card shadow-lg z-50"
                >
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="text-destructive hover:bg-destructive/10 transition-colors duration-300 luxury-text tracking-wide cursor-pointer"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
