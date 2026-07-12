import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatApiError } from "@/lib/api";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSEO } from "@/components/SEO";

export default function AdminLogin() {
  useSEO("Admin Login");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  React.useEffect(() => { if (user) navigate("/admin"); }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      toast.success("Welcome back.");
      navigate("/admin");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <Logo />
        <div>
          <h1 className="text-4xl font-semibold leading-tight">Caya CMS</h1>
          <p className="mt-4 max-w-sm text-primary-foreground/70">Manage content, insights, and enquiries across the Caya Technologies website.</p>
        </div>
        <p className="text-xs text-primary-foreground/50">© {new Date().getFullYear()} Caya Technologies</p>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral/12 text-coral"><Lock className="h-5 w-5" /></span>
          <h2 className="mt-5 text-2xl font-semibold">Sign in to the CMS</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Authorized administrators only.</p>
          <form onSubmit={submit} className="mt-8 space-y-4" data-testid="admin-login-form">
            <div>
              <Label className="text-xs">Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@cayatech.com" className="mt-1.5" data-testid="login-email" />
            </div>
            <div>
              <Label className="text-xs">Password</Label>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1.5" data-testid="login-password" />
            </div>
            <Button type="submit" disabled={busy} className="w-full rounded-full" data-testid="login-submit">
              {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…</> : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
