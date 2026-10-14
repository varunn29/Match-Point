
import {
    Goal,
    Target,
    Clock3,
    Flag,
    Layers,
} from "lucide-react";
import MarketSection from "./MarketSection";
import MarketSelection from "./MarketSelection";

type OtherMarketsProps = {
    matchId: number;
    matchName: string;
    team1: string;
    team2: string;
};

function OtherMarkets({
    matchId,
    matchName,
    team1,
    team2,
}: OtherMarketsProps) {
    return (
        <div className="mt-4 space-y-3">
            <MarketSection
                matchId={matchId}
                matchName={matchName}
                title="Double Chance"
                icon={<Target size={17} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={51}
                    matchId={matchId}
                    matchName={matchName}
                    market="Double Chance"
                    label={`${team1} or Draw`}
                    odds={1.25}
                />
                <MarketSelection
                    selectionId={52}
                    matchId={matchId}
                    matchName={matchName}
                    market="Double Chance"
                    label={`${team1} or ${team2}`}
                    odds={1.22}
                />
                <MarketSelection
                    selectionId={53}
                    matchId={matchId}
                    matchName={matchName}
                    market="Double Chance"
                    label={`Draw or ${team2}`}
                    odds={1.85}
                />
            </MarketSection>

            <MarketSection
                matchId={matchId}
                matchName={matchName}
                title="Correct Score"
                icon={<Goal size={17} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={61}
                    matchId={matchId}
                    matchName={matchName}
                    market="Correct Score"
                    label="1–1"
                    odds={6.5}
                />
                <MarketSelection
                    selectionId={62}
                    matchId={matchId}
                    matchName={matchName}
                    market="Correct Score"
                    label="2–1"
                    odds={8.0}
                />
                <MarketSelection
                    selectionId={63}
                    matchId={matchId}
                    matchName={matchName}
                    market="Correct Score"
                    label="1–2"
                    odds={12.0}
                />
                <MarketSelection
                    selectionId={64}
                    matchId={matchId}
                    matchName={matchName}
                    market="Correct Score"
                    label="2–2"
                    odds={11.0}
                />
                <MarketSelection
                    selectionId={65}
                    matchId={matchId}
                    matchName={matchName}
                    market="Correct Score"
                    label="1–0"
                    odds={9.0}
                />
                <MarketSelection
                    selectionId={66}
                    matchId={matchId}
                    matchName={matchName}
                    market="Correct Score"
                    label="Other score"
                    odds={15.0}
                />
            </MarketSection>

            <MarketSection
                matchId={matchId}
                matchName={matchName}
                title="Next Goal"
                icon={<Goal size={17} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={71}
                    matchId={matchId}
                    matchName={matchName}
                    market="Next Goal"
                    label={team1}
                    odds={1.9}
                />
                <MarketSelection
                    selectionId={72}
                    matchId={matchId}
                    matchName={matchName}
                    market="Next Goal"
                    label="No more goals"
                    odds={3.2}
                />
                <MarketSelection
                    selectionId={73}
                    matchId={matchId}
                    matchName={matchName}
                    market="Next Goal"
                    label={team2}
                    odds={2.2}
                />
            </MarketSection>

            <MarketSection
                matchId={matchId}
                matchName={matchName}
                title="First-Half Result"
                icon={<Clock3 size={17} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={81}
                    matchId={matchId}
                    matchName={matchName}
                    market="First-Half Result"
                    label={team1}
                    odds={2.4}
                />
                <MarketSelection
                    selectionId={82}
                    matchId={matchId}
                    matchName={matchName}
                    market="First-Half Result"
                    label="Draw"
                    odds={2.1}
                />
                <MarketSelection
                    selectionId={83}
                    matchId={matchId}
                    matchName={matchName}
                    market="First-Half Result"
                    label={team2}
                    odds={3.8}
                />
            </MarketSection>

            <MarketSection
                matchId={matchId}
                matchName={matchName}
                title="Total Corners"
                icon={<Flag size={17} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={91}
                    matchId={matchId}
                    matchName={matchName}
                    market="Total Corners"
                    label="Over 8.5"
                    odds={1.85}
                />
                <MarketSelection
                    selectionId={92}
                    matchId={matchId}
                    matchName={matchName}
                    market="Total Corners"
                    label="Under 8.5"
                    odds={1.95}
                />
            </MarketSection>

            <MarketSection
                matchId={matchId}
                matchName={matchName}
                title="Total Cards"
                icon={<Layers size={17} strokeWidth={1.8} />}
            >
                <MarketSelection
                    selectionId={101}
                    matchId={matchId}
                    matchName={matchName}
                    market="Total Cards"
                    label="Over 3.5"
                    odds={1.8}
                />
                <MarketSelection
                    selectionId={102}
                    matchId={matchId}
                    matchName={matchName}
                    market="Total Cards"
                    label="Under 3.5"
                    odds={2.0}
                />
            </MarketSection>
        </div>
    );
}

export default OtherMarkets;
