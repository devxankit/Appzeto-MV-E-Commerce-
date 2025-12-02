import AppNavbar from "./AppNavbar";
import AppBottomNav from "./AppBottomNav";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <AppNavbar />
      
      {/* Main content with top padding for navbar */}
      <main className="pt-14">
        {children}
      </main>
      
      <AppBottomNav />
    </div>
  );
}

