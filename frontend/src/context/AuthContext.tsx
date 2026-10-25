import {
    createContext,
    useEffect,
    useState
} from "react";
import type { ReactNode } from "react";
import API_BASE_URL from "../api/config";

export type User = {
    id: number;
    full_name: string;
    username: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        async function checkLogin() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/users/me`,
                    {
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    setUser(null);
                    return;
                }

                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error("Could not restore login:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };