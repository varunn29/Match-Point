function HeroCarousel() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#1d2930]">
            <div className="relative h-[200px] w-full">

                {/* Banner image */}
                <img
                    src="/match-point-banner.png"
                    alt="Cricket and football"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050b10]/90 via-[#050b10]/55 to-transparent" />

                {/* Text */}
                <div className="relative flex h-full items-center px-10">
                    <div className="max-w-md">

                        <p className="mb-3 ml-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Welcome To
                        </p>

                        <h1 className="text-5xl font-extrabold italic uppercase leading-tight tracking-wide text-white">
                            Match <span className="text-primary">Point</span>
                        </h1>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-[#c1cad5]">
                            <span>Cricket & Football</span>
                            <span className="mx-3">•</span>
                            <span>Live Sports</span>
                            <span className="mx-3">•</span>
                            <span>Real Odds</span>
                        </p>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default HeroCarousel;