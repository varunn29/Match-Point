import { useContext } from "react";
import HeroCarousel from "../components/home/HeroCarousel";
import MatchList from "../components/home/MatchList";
import FilterContext from "../context/FilterContext";
import { liveMatches, upcomingMatches } from "../data/matchesData";

function Home() {
    const context = useContext(FilterContext);

    if (context === null) {
        return null;
    }

    const allMatches = [...liveMatches, ...upcomingMatches];

    const filteredMatches = allMatches.filter(function (match) {
        const matchesSport =
            context.sport === "all" ||
            match.sport.toLowerCase() === context.sport;

        const matchesStatus =
            context.status === "all" ||
            match.status.toLowerCase() === context.status;

        return matchesSport && matchesStatus;
    });

    const filteredLiveMatches = filteredMatches.filter(function (match) {
        return match.status === "Live";
    });

    const filteredUpcomingMatches = filteredMatches.filter(function (match) {
        return match.status === "Upcoming";
    });

    return (
        <div className="px-6 py-6">
            <HeroCarousel />

            <div className="mt-6">
                <MatchList
                    liveMatches={filteredLiveMatches}
                    upcomingMatches={filteredUpcomingMatches}
                />
            </div>
        </div>
    );
}

export default Home;