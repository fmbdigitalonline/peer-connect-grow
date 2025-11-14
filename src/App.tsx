import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import HelpRequest from "./pages/HelpRequest";
import Matches from "./pages/Matches";
import Sessions from "./pages/Sessions";
import SessionDetail from "./pages/SessionDetail";
import Portfolio from "./pages/Portfolio";
import Community from "./pages/Community";
import Library from "./pages/Library";
import CoachDashboard from "./pages/CoachDashboard";
import RoleEnvironment from "./pages/RoleEnvironment";
import SupporteeJourney from "./pages/SupporteeJourney";
import SupporteeOnboarding from "./pages/SupporteeOnboarding";
import SupporteeHub from "./pages/SupporteeHub";
import BuddyJourney from "./pages/BuddyJourney";
import BuddyOnboarding from "./pages/BuddyOnboarding";
import BuddyHub from "./pages/BuddyHub";
import LeaderJourney from "./pages/LeaderJourney";
import LeaderOnboarding from "./pages/LeaderOnboarding";
import LeaderHub from "./pages/LeaderHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/supportee/onboarding" element={<SupporteeOnboarding />} />
          <Route path="/supportee/journey" element={<SupporteeJourney />} />
          <Route path="/supportee/hub" element={<SupporteeHub />} />
          <Route path="/buddy/onboarding" element={<BuddyOnboarding />} />
          <Route path="/buddy/journey" element={<BuddyJourney />} />
          <Route path="/buddy/hub" element={<BuddyHub />} />
          <Route path="/leader/onboarding" element={<LeaderOnboarding />} />
          <Route path="/leader/journey" element={<LeaderJourney />} />
          <Route path="/leader/hub" element={<LeaderHub />} />
          <Route path="/help-request" element={<HelpRequest />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/:id" element={<SessionDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/community" element={<Community />} />
          <Route path="/library" element={<Library />} />
          <Route path="/coach-dashboard" element={<CoachDashboard />} />
          <Route path="/role/:role" element={<RoleEnvironment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
