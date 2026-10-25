import { X, Info } from "lucide-react";

type FeatureNoticeProps = {
    isOpen: boolean;
    onClose: () => void;
    featureName: string;
};

function FeatureNotice({
    isOpen,
    onClose,
    featureName,
}: FeatureNoticeProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="feature-notice-title"
                className="w-full max-w-md rounded-xl border border-[#263340] bg-[#080f17] p-6 shadow-2xl"
                onClick={function (event) {
                    event.stopPropagation();
                }}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#182331]">
                            <Info
                                size={20}
                                className="text-primary"
                            />
                        </div>

                        <h2
                            id="feature-notice-title"
                            className="text-lg font-bold text-white"
                        >
                            Feature not available
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close popup"
                        className="rounded-md p-1 text-[#8c9aaa] transition-colors hover:bg-[#182331] hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <p className="mt-5 text-sm leading-6 text-[#9aaec2]">
                    {featureName} has not been implemented yet. This is a
                    simulated wallet, and no real payments are processed.
                </p>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-[#07100b] transition-colors hover:bg-primary-dark"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeatureNotice;