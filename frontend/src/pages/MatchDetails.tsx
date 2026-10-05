import {
    CircleDot,
    Goal,
    Shield,
    Trophy
} from "lucide-react";

import MatchHeader from "../components/match-details/MatchHeader";
import MarketTabs from "../components/match-details/MarketTabs";
import MarketSection from "../components/match-details/MarketSection";
import MarketSelection from "../components/match-details/MarketSelection";
import OtherMarkets from "../components/match-details/OtherMarkets";

function MatchDetails() {
    return (
        <div className="px-6 py-6">

            <MatchHeader />

            <MarketTabs />

           {/* Match Winner */}
            <MarketSection
                matchId={1}
                matchName="Manchester City vs Liverpool"
                title="Match Winner"
                icon={<Trophy size={19} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={1}
                    matchId={1}
                    matchName="Manchester City vs Liverpool"
                    market="Match Winner"
                    label="Manchester City"
                    odds={1.85}
                />

                <MarketSelection
                    selectionId={2}
                    matchId={1}
                    matchName="Manchester City vs Liverpool"
                    market="Match Winner"
                    label="Draw"
                    odds={3.60}
                />

                <MarketSelection
                    selectionId={3}
                    matchId={1}
                    matchName="Manchester City vs Liverpool"
                    market="Match Winner"
                    label="Liverpool"
                    odds={4.20}
                />
            </MarketSection>

            {/* Both Teams to Score */}
            <MarketSection
                matchId={1}
                matchName="Manchester City vs Liverpool"
                title="Both Teams to Score"
                icon={<Goal size={19} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={4}
                    matchId={1}
                    matchName="Manchester City vs Liverpool"
                    market="Both Teams to Score"
                    label="Yes"
                    odds={1.65}
                />

                <MarketSelection
                    selectionId={5}
                    matchId={1}
                    matchName="Manchester City vs Liverpool"
                    market="Both Teams to Score"
                    label="No"
                    odds={2.10}
                />
            </MarketSection>

            {/* Total Goals */}
            <MarketSection
                matchId={1}
                matchName="Manchester City vs Liverpool"
                title="Total Goals"
                icon={<CircleDot size={19} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={6}
                    matchId={1}
                    matchName="Manchester City vs Liverpool"
                    market="Total Goals"
                    label="Over 2.5"
                    odds={1.80}
                />

                <MarketSelection
                    selectionId={7}
                    matchId={1}
                    matchName="Manchester City vs Liverpool"
                    market="Total Goals"
                    label="Under 2.5"
                    odds={2.00}
                />
            </MarketSection>

            {/* Asian Handicap */}
            <MarketSection
                matchId={1}
                matchName="Manchester City vs Liverpool"
                title="Asian Handicap"
                icon={<Shield size={19} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={8}
                    matchId={1}
                    matchName="Manchester City vs Liverpool"
                    market="Asian Handicap"
                    label="Manchester City -0.5"
                    odds={2.05}
                />

                <MarketSelection
                    selectionId={9}
                    matchId={1}
                    matchName="Manchester City vs Liverpool"
                    market="Asian Handicap"
                    label="Liverpool +0.5"
                    odds={1.75}
                />
            </MarketSection>

            <OtherMarkets />

        </div>
    );
}

export default MatchDetails;