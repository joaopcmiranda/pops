/**
 * Sidebar navigation
 */
import { Link, useLocation } from "react-router";

interface SidebarProps {
  open: boolean;
}

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/transactions", label: "Transactions", icon: "💳" },
  { path: "/entities", label: "Entities", icon: "🏢" },
  { path: "/budgets", label: "Budgets", icon: "💰" },
  { path: "/inventory", label: "Inventory", icon: "📦" },
  { path: "/wishlist", label: "Wish List", icon: "⭐" },
];

export function Sidebar({ open }: SidebarProps) {
  const location = useLocation();

  if (!open) return null;

  return (
    <aside className="w-64 bg-card border-r border-border h-[calc(100vh-4rem)] fixed top-16 left-0">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
