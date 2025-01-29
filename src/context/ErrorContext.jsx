import { createContext, useState } from "react";

export const ErrorContext = createContext(null);

const errorDefault = { content: "", isShow: false };

export function ErrorProvider({ children }) {
    const [isError, setIsError] = useState(errorDefault);
    const ErrorOn = () => setIsError({ content: "국가명 틀림", isShow: true });
    const ErrorOff = () => setIsError(errorDefault);

    console.log(isError);

    return (
        <>
            <ErrorContext.Provider value={{ isError, ErrorOn, ErrorOff }}>
                {children}
            </ErrorContext.Provider>
        </>
    );
}
