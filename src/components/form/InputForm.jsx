// @ts-ignore

import { ErrorContext } from "@/context/ErrorContext";
import { useContext } from "react";

export function InputForm({ register, placeholder, objectKey }) {
    const { isError } = useContext(ErrorContext);
    return (
        <>
            <input
                type="text"
                placeholder={placeholder}
                className="flex-initial m-2 rounded-md px-1 border-black border-2"
                {...register(objectKey)}
            />
            {objectKey === "nationality" && isError.isShow && (
                <div className="text-red-600 text-center mb-2">
                    {isError.content}
                </div>
            )}
        </>
    );
}
