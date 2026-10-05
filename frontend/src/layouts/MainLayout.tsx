import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SportsSidebar from "./SportsSidebar";
import BetSlip from "./BetSlip";

function MainLayout() {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background text-text">

            <Navbar />

            <div className="flex min-h-0 flex-1">

                <SportsSidebar />

                <main className="min-w-0 flex-1 overflow-y-auto">
                    <Outlet />
                </main>

                <BetSlip />

            </div>

        </div>
    );
}

export default MainLayout;