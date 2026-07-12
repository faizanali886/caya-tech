import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Ecosystem from "@/pages/Ecosystem";
import PlatformDetail from "@/pages/PlatformDetail";
import Government from "@/pages/Government";
import Industries from "@/pages/Industries";
import IndustryDetail from "@/pages/IndustryDetail";
import Insights from "@/pages/Insights";
import InsightDetail from "@/pages/InsightDetail";
import Partners from "@/pages/Partners";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/NotFound";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Submissions from "@/pages/admin/Submissions";
import Articles from "@/pages/admin/Articles";
import ArticleEdit from "@/pages/admin/ArticleEdit";
import Subscribers from "@/pages/admin/Subscribers";

const withLayout = (el) => <Layout>{el}</Layout>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route path="/" element={withLayout(<Home />)} />
          <Route path="/about" element={withLayout(<About />)} />
          <Route path="/ecosystem" element={withLayout(<Ecosystem />)} />
          <Route path="/platforms/:slug" element={withLayout(<PlatformDetail />)} />
          <Route path="/government" element={withLayout(<Government />)} />
          <Route path="/industries" element={withLayout(<Industries />)} />
          <Route path="/industries/:slug" element={withLayout(<IndustryDetail />)} />
          <Route path="/insights" element={withLayout(<Insights />)} />
          <Route path="/insights/:slug" element={withLayout(<InsightDetail />)} />
          <Route path="/partners" element={withLayout(<Partners />)} />
          <Route path="/careers" element={withLayout(<Careers />)} />
          <Route path="/contact" element={withLayout(<Contact />)} />
          <Route path="/legal/:doc" element={withLayout(<Legal />)} />

          {/* Admin / CMS */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
          >
            <Route index element={<Dashboard />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:id" element={<ArticleEdit />} />
            <Route path="subscribers" element={<Subscribers />} />
          </Route>

          <Route path="*" element={withLayout(<NotFound />)} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
