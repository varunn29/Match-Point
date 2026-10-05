import { WalletCards, UserRound } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="h-[68px] border-b border-[#1d2930] bg-[#070d13]">
            <div className="flex h-full items-center justify-between px-8">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <img
                        src="/match-point-icon-transparent.png"
                        alt="Match Point"
                        className="h-10 w-10 object-contain"
                    />

                    <span className="text-[18px] font-extrabold italic tracking-[-0.5px] text-white">
                        MATCH POINT
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="ml-[-180px] flex h-full items-center gap-1">

                    <NavLink
                        to="/"
                        end
                        className="relative flex h-full items-center px-4 text-[16px] font-medium"
                    >
                        {function ({ isActive }) {
                            return (
                                <>
                                    <span
                                        className={
                                            isActive
                                                ? "text-[#35d07f]"
                                                : "text-[#8c9aaa] hover:text-white"
                                        }
                                    >
                                        Sports
                                    </span>

                                    {isActive && (
                                        <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#35d07f]" />
                                    )}
                                </>
                            );
                        }}
                    </NavLink>

                    <NavLink
                        to="/live"
                        className="relative flex h-full items-center px-4 text-[16px] font-medium"
                    >
                        {function ({ isActive }) {
                            return (
                                <>
                                    <span
                                        className={
                                            isActive
                                                ? "text-[#35d07f]"
                                                : "text-[#8c9aaa] hover:text-white"
                                        }
                                    >
                                        Live
                                    </span>

                                    {isActive && (
                                        <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#35d07f]" />
                                    )}
                                </>
                            );
                        }}
                    </NavLink>

                    <NavLink
                        to="/my-bets"
                        className="relative flex h-full items-center px-4 text-[16px] font-medium"
                    >
                        {function ({ isActive }) {
                            return (
                                <>
                                    <span
                                        className={
                                            isActive
                                                ? "text-[#35d07f]"
                                                : "text-[#8c9aaa] hover:text-white"
                                        }
                                    >
                                        My Bets
                                    </span>

                                    {isActive && (
                                        <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#35d07f]" />
                                    )}
                                </>
                            );
                        }}
                    </NavLink>

                    <NavLink
                        to="/wallet"
                        className="relative flex h-full items-center px-4 text-[16px] font-medium"
                    >
                        {function ({ isActive }) {
                            return (
                                <>
                                    <span
                                        className={
                                            isActive
                                                ? "text-[#35d07f]"
                                                : "text-[#8c9aaa] hover:text-white"
                                        }
                                    >
                                        Wallet
                                    </span>

                                    {isActive && (
                                        <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#35d07f]" />
                                    )}
                                </>
                            );
                        }}
                    </NavLink>

                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">

                    {/* Wallet */}
                    <Link
                        to="/wallet"
                        className="flex h-11 items-center gap-2.5 rounded-full border border-[#34414d] px-5 text-white transition-colors hover:border-[#4a5967]"
                    >
                        <WalletCards size={19} strokeWidth={1.7} />

                        <span className="text-sm font-bold">
                            ₹0.00
                        </span>
                    </Link>

                    {/* Profile */}
                    <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#182331]"
                        aria-label="Profile"
                    >
                        <UserRound
                            size={24}
                            color="#9aa9bc"
                            strokeWidth={1.8}
                        />
                    </button>

                </div>

            </div>
        </header>
    );
}

export default Navbar;

