
import {
  BarChart3,
  Building2,
  Calendar,
  Home,
  Settings,
  Users,
  UserCheck,
  ClipboardList,
  TrendingUp,
  Crown,
  Sparkles
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
    <Sidebar className="border-r border-border/20 bg-sidebar luxury-gradient">
      <SidebarHeader className="p-8 border-b border-white/10">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center mb-4 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm">
            <Crown className="w-6 h-6 text-accent" />
          </div>
          <div className="luxury-text text-white text-lg tracking-[0.3em] mb-1">
            MAISON
          </div>
          <div className="w-8 h-px bg-accent mb-2"></div>
          <p className="text-xs text-white/60 luxury-text tracking-wider">
            Console
          </p>
        </div>
        
        {/* Salon Selector for multi-salon owners */}
        {isSalonOwner && (
          <div className="mt-6">
            <SalonSelector />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 luxury-text text-xs tracking-[0.2em] mb-4 px-4">
            {isAdmin ? 'Administration' : 'Salon Management'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-white/10 transition-all duration-500 rounded-lg">
                    <Link 
                      to={item.url} 
                      className={`flex items-center gap-4 px-4 py-3 group ${
                        location.pathname === item.url 
                          ? 'bg-white/15 text-white border-l-2 border-accent' 
                          : 'text-white/80 hover:text-white'
                      }`}
                      onClick={() => console.log('Navigating to:', item.url)}
                    >
                      <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span className="luxury-text text-xs tracking-wider font-light">
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge className="ml-auto bg-accent text-accent-foreground text-xs px-2 py-0.5">
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

      <SidebarFooter className="p-6 border-t border-white/10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center border-2 border-white/20">
              <span className="text-primary text-sm font-medium luxury-text">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-light text-white luxury-text tracking-wide truncate">
                {user?.name}
              </p>
              <p className="text-xs text-white/60 luxury-text tracking-wider capitalize">
                {user?.role}
              </p>
            </div>
            <Sparkles className="h-4 w-4 text-accent opacity-60" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
