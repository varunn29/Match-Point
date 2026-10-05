import { Route, Routes } from "react-router-dom";
import { BetSlipProvider } from "./context/BetSlipContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Live from "./pages/Live";
import MatchDetails from "./pages/MatchDetails";
import MyBets from "./pages/MyBets";
import Wallet from "./pages/Wallet";

function App() {
    return (
        <BetSlipProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/live" element={<Live />} />
                    <Route path="/matches/:matchId" element={<MatchDetails />} />
                    <Route path="/my-bets" element={<MyBets />} />
                    <Route path="/wallet" element={<Wallet />} />
                </Route>
            </Routes>
        </BetSlipProvider>
    );
}

export default App;