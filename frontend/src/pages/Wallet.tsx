import { useEffect, useState } from "react";
import WalletBalance from "../components/wallet/WalletBalance";
import WalletActions from "../components/wallet/WalletActions";
import TransactionHistory from "../components/wallet/TransactionHistory";
import API_BASE_URL from "../api/config";

function Wallet() {
    const [balance, setBalance] = useState("0.00");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(function () {
        async function fetchWallet() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/wallet`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setErrorMessage(
                        data.message || "Unable to load your wallet."
                    );
                    return;
                }

                setBalance(Number(data.wallet.balance).toLocaleString(
                    "en-IN",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }
                ));
            } catch {
                setErrorMessage("Could not connect to the server.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchWallet();
    }, []);

    return (
        <div className="px-6 py-6">
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Wallet
                </h1>

                <p className="mt-1 text-sm text-[#718096]">
                    Manage your balance and view your transaction history.
                </p>
            </div>

            <section className="mt-6 rounded-xl border border-[#1d2930] bg-[#080f17] p-5">
                {isLoading ? (
                    <p className="text-sm text-[#9aaec2]">
                        Loading wallet...
                    </p>
                ) : errorMessage ? (
                    <p className="text-sm text-[#ff6570]">
                        {errorMessage}
                    </p>
                ) : (
                    <div className="flex items-center">
                        <WalletBalance balance={balance} />
                        <WalletActions />
                    </div>
                )}
            </section>

            <TransactionHistory />
        </div>
    );
}

export default Wallet;