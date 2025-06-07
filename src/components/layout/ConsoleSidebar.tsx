
import {
  BarChart3,
  Building2,
  Calendar,
  Home,
  Settings,
  Users,
  UserCheck,
  ClipboardList,
  TrendingUp
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { SalonSelector } from "@/components/auth/SalonSelector";
import { Link, useLocation } from "react-router-dom";

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

export function ConsoleSidebar() {
  const { user, isAdmin, isSalonOwner } = useAuth();
  const location = useLocation();
  const menuItems = isAdmin ? adminMenuItems : ownerMenuItems;

  console.log('ConsoleSidebar render - current location:', location.pathname);

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/lovable-uploads/36c651de-4416-4bd1-929a-099e914b36cd.png" 
              alt="HAIB Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">HAIB</h1>
            <p className="text-xs text-sidebar-foreground/60">Console</p>
          </div>
        </div>
        
        {/* Salon Selector for multi-salon owners */}
        {isSalonOwner && (
          <div className="mt-4">
            <SalonSelector />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 uppercase text-xs font-medium tracking-wider">
            {isAdmin ? 'Administration' : 'Salon Management'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-sidebar-accent">
                    <Link 
                      to={item.url} 
                      className={`flex items-center gap-3 ${
                        location.pathname === item.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                      }`}
                      onClick={() => console.log('Navigating to:', item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="bg-sidebar-accent rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
