import { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import API_BASE_URL from "../../api/config";

type Transaction = {
    id: string;
    transaction_type: string;
    amount: string;
    balance_after: string;
    created_at: string;
};

function formatCurrency(value: number) {
    return `₹${Math.abs(value).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

function formatDate(value: string) {
    return new Date(value).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

function getTransactionDetails(transaction: Transaction) {
    switch (transaction.transaction_type) {
        case "bet_stake":
            return {
                type: "bet" as const,
                title: "Bet Placed",
                description: "Bet stake",
                sign: "-",
            };

        case "bet_win":
            return {
                type: "win" as const,
                title: "Bet Won",
                description: "Bet winnings",
                sign: "+",
            };

        case "welcome_bonus":
            return {
                type: "deposit" as const,
                title: "Welcome Bonus",
                description: "Welcome bonus credited",
                sign: "+",
            };

        default:
            return {
                type: "deposit" as const,
                title: "Wallet Transaction",
                description: transaction.transaction_type.replace(/_/g, " "),
                sign: Number(transaction.amount) < 0 ? "-" : "+",
            };
    }
}

function TransactionHistory() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(function () {
        async function fetchTransactions() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/wallet/transactions`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setErrorMessage(
                        data.message || "Unable to load transactions."
                    );
                    return;
                }

                setTransactions(data.transactions);
            } catch {
                setErrorMessage("Could not connect to the server.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchTransactions();
    }, []);

    return (
        <section className="mt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                    Recent Transactions
                </h2>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#1d2930] bg-[#080f17]">
                {isLoading ? (
                    <p className="p-5 text-sm text-[#9aaec2]">
                        Loading transactions...
                    </p>
                ) : errorMessage ? (
                    <p className="p-5 text-sm text-[#ff6570]">
                        {errorMessage}
                    </p>
                ) : transactions.length === 0 ? (
                    <p className="p-5 text-sm text-[#9aaec2]">
                        You don't have any transactions yet.
                    </p>
                ) : (
                    transactions.map(function (transaction) {
                        const details = getTransactionDetails(transaction);
                        const amount = Number(transaction.amount);

                        return (
                            <TransactionItem
                                key={transaction.id}
                                type={details.type}
                                title={details.title}
                                description={details.description}
                                date={formatDate(transaction.created_at)}
                                amount={`${details.sign} ${formatCurrency(amount)}`}
                                balance={formatCurrency(
                                    Number(transaction.balance_after)
                                )}
                            />
                        );
                    })
                )}
            </div>
        </section>
    );
}

export default TransactionHistory;