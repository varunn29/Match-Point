import { Route, Routes } from "react-router-dom";
import { BetSlipProvider } from "./context/BetSlipContext";
import { FilterProvider } from "./context/FilterContext";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MatchDetails from "./pages/MatchDetails";
import MyBets from "./pages/MyBets";
import Wallet from "./pages/Wallet";

function App() {
    return (
        <BetSlipProvider>
            <FilterProvider>
                <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                    {/* Main Application */}
                    <Route element={<MainLayout />}>
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/matches/:matchId"
                            element={<MatchDetails />}
                        />
                        <Route path="/my-bets" element={<MyBets />} />
                        <Route path="/wallet" element={<Wallet />} />
                    </Route>
                </Routes>
            </FilterProvider>
        </BetSlipProvider>
    );
}

export default App;