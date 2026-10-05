import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type SportFilter = "all" | "cricket" | "football";
type StatusFilter = "all" | "live" | "upcoming";

type FilterContextValue = {
    sport: SportFilter;
    setSport: Dispatch<SetStateAction<SportFilter>>;

    status: StatusFilter;
    setStatus: Dispatch<SetStateAction<StatusFilter>>;

    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
};

const FilterContext = createContext<FilterContextValue | null>(null);

function FilterProvider({ children }: { children: ReactNode }) {
    const [sport, setSport] = useState<SportFilter>("all");
    const [status, setStatus] = useState<StatusFilter>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <FilterContext.Provider
            value={{
                sport,
                setSport,
                status,
                setStatus,
                searchQuery,
                setSearchQuery
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export default FilterContext;
export { FilterProvider };