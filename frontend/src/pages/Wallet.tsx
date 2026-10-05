import WalletBalance from "../components/wallet/WalletBalance";
import WalletActions from "../components/wallet/WalletActions";
import TransactionHistory from "../components/wallet/TransactionHistory";

function Wallet() {
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

                <div className="flex items-center">

                    <WalletBalance
                        balance="1,000.00"
                    />

                    <WalletActions />

                </div>

            </section>

            <TransactionHistory />

        </div>
    );
}

export default Wallet;