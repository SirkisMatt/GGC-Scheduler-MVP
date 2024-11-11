import { Outlet, Link, useLocation } from "@remix-run/react";
import { CalendarDays, Anchor, Users, Settings } from "lucide-react";
import { cn } from "~/lib/utils";

export default function AppLayout() {
  const location = useLocation();

  const NavLink = ({
    to,
    icon: Icon,
    children,
  }: {
    to: string;
    icon: any;
    children: React.ReactNode;
  }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        )}
      >
        <Icon className="h-4 w-4" />
        {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Anchor className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                Marine Tours Management
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-2">
              <NavLink to="/scheduler" icon={Anchor}>
                Boat Scheduler
              </NavLink>
              <NavLink to="/employees" icon={Users}>
                Employees
              </NavLink>
              <NavLink to="/calendar" icon={CalendarDays}>
                Calendar
              </NavLink>
              <NavLink to="/settings" icon={Settings}>
                Settings
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
