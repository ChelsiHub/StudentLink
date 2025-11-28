import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import JobBoard from "./pages/JobBoard";
import GroupList from "./pages/GroupList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/groups" element={<GroupList />} />
      </Routes>
    </Router>
  );
}

export default App;
