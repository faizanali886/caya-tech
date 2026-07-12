import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Inbox, FileText, LogOut, ExternalLink, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/submissions", label: "Enquiries", icon: Inbox },
  { to: "/admin/articles", label: "Insights", icon: FileText },
  { to: "/admin/subscribers", label: "Subscribers", icon: Mail },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface p-4">
        <div className="px-2 py-2"><Logo /></div>
        <nav className="mt-6 flex-1 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to} to={l.to} end={l.end}
              data-testid={`admin-nav-${l.label.toLowerCase()}`}
              className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
            >
              <l.icon className="h-4 w-4" /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-2 border-t border-border pt-4">
          <Link to="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <div className="flex items-center justify-between px-3">
            <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
            <ThemeToggle />
          </div>
          <button
            onClick={() => { logout(); navigate("/admin/login"); }}
            data-testid="admin-logout"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden p-6 sm:p-10">
        <Outlet />
      </main>
    </div>
  );
}
