import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Analytics from "./pages/Analytics";
import Disputes from "./pages/Disputes";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Seekers from "./pages/Seekers";
import Rewards from "./pages/Rewards";
import PrivacySecurity from "./pages/PrivacySecurity";
import Givers from "./pages/Givers";
import ResetPin from "./pages/ResetPin";
import PageNotFound from "./pages/PageNotFound";
import PinEntry from "./pages/PinEntry";
import UpdatePassword from "./pages/UpdatePassword";
import SeekerDetails from "./pages/SeekerDetails";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 60 seconds
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="disputes" element={<Disputes />} />
            <Route path="givers" element={<Givers />} />
            <Route path="givers/:id" element={<SeekerDetails />} />
            <Route path="privacy" element={<PrivacySecurity />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="seekers" element={<Seekers />} />
            <Route path="seekers/:id" element={<SeekerDetails />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="pin-entry" element={<PinEntry />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="reset" element={<ResetPin />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
