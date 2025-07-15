
import { Bell, Search, LogOut, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const ConsoleHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-border/20 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 elegant-shadow">
      <div className="flex h-20 items-center gap-6 px-8">
        <SidebarTrigger className="-ml-1 hover:bg-muted/50 transition-colors duration-300 rounded-lg" />
        
        <div className="flex-1 flex items-center gap-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search collections..." 
              className="pl-12 w-80 h-12 border-border/30 luxury-hover rounded-lg bg-background/50 backdrop-blur-sm luxury-text text-sm tracking-wide"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-12 w-12 hover:bg-muted/50 transition-all duration-300 rounded-lg"
          >
            <Bell className="h-5 w-5" />
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground border-0"
            >
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-3 h-12 px-4 hover:bg-muted/50 transition-all duration-300 rounded-lg"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center border border-border/20">
                  <span className="text-primary-foreground text-sm luxury-text font-medium">
                    {user?.name.charAt(0)}
                  </span>
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm luxury-text tracking-wide font-medium">
                    {user?.name}
                  </span>
                  <span className="text-xs text-muted-foreground luxury-text tracking-wider capitalize">
                    {user?.role}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 border-border/20 bg-background/95 backdrop-blur-xl elegant-shadow"
            >
              <DropdownMenuItem 
                onClick={logout} 
                className="text-destructive hover:bg-destructive/10 transition-colors duration-300 luxury-text tracking-wide"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
