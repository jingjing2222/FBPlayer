import { createContext, useState } from "react";

export const ErrorContext = createContext(null);

export function ErrorProvider({ children }) {
    const [isError, setIsError] = useState("");
    return (
        <>
            <ErrorContext.Provider value={{ isError, setIsError }}>
                {children}
            </ErrorContext.Provider>
        </>
    );
}
