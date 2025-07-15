
import { ConsoleHeader } from "./ConsoleHeader";

interface ConsoleLayoutProps {
  children: React.ReactNode;
}

export const ConsoleLayout = ({ children }: ConsoleLayoutProps) => {
  return (
    <div className="min-h-screen bg-background/95">
      <ConsoleHeader />
      <main className="p-8">
        {children}
      </main>
    </div>
  );
};
