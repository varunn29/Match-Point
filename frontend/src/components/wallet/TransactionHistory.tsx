import TransactionItem from "./TransactionItem";

function TransactionHistory() {
    return (
        <section className="mt-8">

            <div className="flex items-center justify-between">

                <h2 className="text-lg font-bold text-white">
                    Recent Transactions
                </h2>

                <button className="text-xs font-medium text-[#8c9aaa] transition-colors hover:text-white">
                    View All →
                </button>

            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#1d2930] bg-[#080f17]">

                <TransactionItem
                    type="bet"
                    title="Bet Placed"
                    description="Manchester City vs Liverpool"
                    date="12 Oct 2025 • 15:30"
                    amount="- ₹100"
                    balance="₹1,000"
                />

                <TransactionItem
                    type="win"
                    title="Bet Won"
                    description="India vs Australia"
                    date="28 Sep 2025 • 19:30"
                    amount="+ ₹185"
                    balance="₹1,100"
                />

                <TransactionItem
                    type="bet"
                    title="Bet Placed"
                    description="Real Madrid vs Barcelona"
                    date="20 Sep 2025 • 21:00"
                    amount="- ₹150"
                    balance="₹915"
                />

                <TransactionItem
                    type="win"
                    title="Bet Won"
                    description="Liverpool vs AC Milan"
                    date="14 Sep 2025 • 19:30"
                    amount="+ ₹260"
                    balance="₹1,065"
                />

                <TransactionItem
                    type="bet"
                    title="Bet Placed"
                    description="PSG vs Bayern Munich"
                    date="10 Sep 2025 • 22:00"
                    amount="- ₹200"
                    balance="₹805"
                />

                <TransactionItem
                    type="deposit"
                    title="Funds Added"
                    description="Simulated Deposit"
                    date="05 Sep 2025 • 12:15"
                    amount="+ ₹500"
                    balance="₹1,005"
                />

            </div>

        </section>
    );
}

export default TransactionHistory;