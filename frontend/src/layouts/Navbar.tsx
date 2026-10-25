import { useContext, useEffect, useRef, useState } from "react";
import {
    WalletCards,
    ChevronDown,
    UserRound,
    Settings,
    LogOut
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import FeatureNotice from "../components/wallet/FeatureNotice";
import API_BASE_URL from "../api/config";

function Navbar() {
    const authContext = useContext(AuthContext);

    if (authContext === null) {
        throw new Error("Navbar must be used inside AuthProvider.");
    }

    const { user, setUser, isLoading } = authContext;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [walletBalance, setWalletBalance] = useState<string | null>(null);
    const [selectedFeature, setSelectedFeature] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(function () {
        let isActive = true;

        async function fetchWalletBalance() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/wallet`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    return;
                }

                const data = await response.json();
                const balance = Number(data.wallet.balance);

                if (isActive && Number.isFinite(balance)) {
                    setWalletBalance(
                        balance.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                    );
                }
            } catch (error) {
                console.error("Could not fetch navbar wallet balance:", error);
            }
        }

        function handleWalletUpdate() {
            fetchWalletBalance();
        }

        if (!isLoading && user) {
            fetchWalletBalance();

            window.addEventListener(
                "wallet-updated",
                handleWalletUpdate
            );
        } else {
            setWalletBalance(null);
        }

        return function () {
            isActive = false;

            window.removeEventListener(
                "wallet-updated",
                handleWalletUpdate
            );
        };
    }, [user, isLoading]);

    useEffect(function () {
        function handleOutsideClick(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        }

        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscapeKey);

        return function () {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);

    function handleFeatureClick(featureName: string) {
        setIsMenuOpen(false);
        setSelectedFeature(featureName);
    }

    async function handleLogout() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/users/logout`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            if (!response.ok) {
                console.error("Could not log out from the server.");
                return;
            }

            setUser(null);
            setWalletBalance(null);
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <>
            <header className="h-[68px] border-b border-[#1d2930] bg-[#070d13]">
                <div className="flex h-full items-center justify-between px-8">
                    {/* Logo */}
                    <Link to="/home" className="flex items-center gap-3">
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
                            to="/home"
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
                        <Link
                            to="/wallet"
                            className="flex h-11 items-center gap-2.5 rounded-full border border-[#34414d] px-5 text-white transition-colors hover:border-[#4a5967]"
                        >
                            <WalletCards size={19} strokeWidth={1.7} />

                            <span className="text-sm font-bold">
                                {walletBalance === null
                                    ? "—"
                                    : `₹${walletBalance}`}
                            </span>
                        </Link>

                        {/* Logged-out state */}
                        {!isLoading && !user && (
                            <Link
                                to="/login"
                                className="flex h-11 items-center justify-center rounded-full bg-[#35d07f] px-5 text-sm font-bold text-[#07130d] transition-colors hover:bg-[#2cbd70]"
                            >
                                Log in
                            </Link>
                        )}

                        {/* Logged-in state */}
                        {!isLoading && user && (
                            <div className="relative" ref={menuRef}>
                                <button
                                    type="button"
                                    onClick={function () {
                                        setIsMenuOpen(!isMenuOpen);
                                    }}
                                    aria-expanded={isMenuOpen}
                                    aria-haspopup="menu"
                                    className="flex h-11 items-center gap-2 rounded-full border border-[#34414d] bg-[#101923] px-4 text-sm font-semibold text-white transition-colors hover:border-[#4a5967]"
                                >
                                    <span>{user.username}</span>

                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${
                                            isMenuOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {isMenuOpen && (
                                    <div
                                        role="menu"
                                        className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-[#263441] bg-[#0b141e] py-2 shadow-xl"
                                    >
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={function () {
                                                handleFeatureClick("My Profile");
                                            }}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#c2ccd8] transition-colors hover:bg-[#182331] hover:text-white"
                                        >
                                            <UserRound size={17} />
                                            <span>My profile</span>
                                        </button>

                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={function () {
                                                handleFeatureClick("Settings");
                                            }}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#c2ccd8] transition-colors hover:bg-[#182331] hover:text-white"
                                        >
                                            <Settings size={17} />
                                            <span>Settings</span>
                                        </button>

                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-400 transition-colors hover:bg-[#182331]"
                                        >
                                            <LogOut size={17} />
                                            <span>Log out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <FeatureNotice
                isOpen={selectedFeature !== ""}
                onClose={function () {
                    setSelectedFeature("");
                }}
                featureName={selectedFeature}
            />
        </>
    );
}

export default Navbar;