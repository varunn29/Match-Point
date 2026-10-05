import { ArrowDownLeft, ArrowUpRight, ChevronRight, WalletCards } from "lucide-react";

type TransactionItemProps = {
    type: "bet" | "win" | "deposit";
    title: string;
    description: string;
    date: string;
    amount: string;
    balance: string;
};

function TransactionItem({
    type,
    title,
    description,
    date,
    amount,
    balance
}: TransactionItemProps) {

    const isIncoming = type === "win" || type === "deposit";

    return (
        <div className="flex items-center border-b border-[#1d2930] px-5 py-4">

            {/* Transaction Icon */}

            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isIncoming
                        ? "bg-[#123a2d]"
                        : "bg-[#351b21]"
                }`}
            >

                {type === "deposit" ? (
                    <WalletCards
                        size={18}
                        strokeWidth={1.8}
                        className="text-[#c1cad5]"
                    />
                ) : isIncoming ? (
                    <ArrowDownLeft
                        size={18}
                        strokeWidth={1.8}
                        className="text-primary"
                    />
                ) : (
                    <ArrowUpRight
                        size={18}
                        strokeWidth={1.8}
                        className="text-[#ef233c]"
                    />
                )}

            </div>

            {/* Transaction Information */}

            <div className="ml-4 min-w-0 flex-1">

                <p className="text-sm font-semibold text-white">
                    {title}
                </p>

                <p className="mt-1 text-xs text-[#718096]">
                    {description}
                </p>

                <p className="mt-1 text-[11px] text-[#596673]">
                    {date}
                </p>

            </div>

            {/* Amount */}

            <div className="text-right">

                <p
                    className={`text-sm font-semibold ${
                        isIncoming
                            ? "text-primary"
                            : "text-[#ef233c]"
                    }`}
                >
                    {amount}
                </p>

                <p className="mt-1 text-[11px] text-[#718096]">
                    Balance: {balance}
                </p>

            </div>

            <ChevronRight
                size={18}
                className="ml-5 text-[#718096]"
            />

        </div>
    );
}

export default TransactionItem;