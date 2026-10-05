function SportFilter() {
    return (
        <div className="flex items-center gap-2">
            <button
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white"
            >
                All
            </button>

            <button
                className="rounded-full border border-[#1d2930] bg-[#0b131c] px-4 py-2 text-sm font-medium text-[#8c9aaa] transition-colors hover:border-[#34414d] hover:text-white"
            >
                Cricket
            </button>

            <button
                className="rounded-full border border-[#1d2930] bg-[#0b131c] px-4 py-2 text-sm font-medium text-[#8c9aaa] transition-colors hover:border-[#34414d] hover:text-white"
            >
                Football
            </button>
        </div>
    );
}

export default SportFilter;