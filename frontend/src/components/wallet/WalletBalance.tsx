import { ArrowDownLeft, ArrowUpRight, WalletCards } from "lucide-react";

type WalletBalanceProps = {
    balance: string;
};

function WalletBalance({balance}: WalletBalanceProps) {
    return (
        <div className="shrink-0">

            {/* Balance */}

            <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#182331]">
                    <WalletCards
                        size={22}
                        strokeWidth={1.8}
                        className="text-[#c1cad5]"
                    />
                </div>

                <div>
                    <p className="text-xs font-medium text-[#8c9aaa]">
                        Available Balance
                    </p>

                    <p className="mt-1 text-2xl font-bold text-primary">
                        ₹{balance}
                    </p>
                </div>

            </div>

            {/* Wallet Buttons */}

            <div className="mt-8 flex items-center gap-3">

                <button className="flex h-14 w-[194px] items-center justify-center gap-2 rounded-lg bg-primary text-base font-medium text-[#07100b] transition-colors hover:bg-primary-dark">

                    <ArrowDownLeft
                        size={19}
                        strokeWidth={2}
                    />

                    Add Funds

                </button>

                <button className="flex h-14 w-[194px] items-center justify-center gap-2 rounded-lg border border-[#34414d] bg-transparent text-base font-medium text-white transition-colors hover:border-[#4a5967]">

                    <ArrowUpRight
                        size={19}
                        strokeWidth={2}
                    />

                    Withdraw

                </button>

            </div>

        </div>
    );
}

export default WalletBalance;