
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsoleSidebar } from "./ConsoleSidebar";
import { ConsoleHeader } from "./ConsoleHeader";

interface ConsoleLayoutProps {
  children: React.ReactNode;
}

export const ConsoleLayout = ({ children }: ConsoleLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <ConsoleSidebar />
        <div className="flex-1 flex flex-col">
          <ConsoleHeader />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
