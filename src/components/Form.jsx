import { ErrorContext, ErrorProvider } from "@/components/form/ErrorContext";
import { InputForm } from "@/components/form/InputForm";
import SearchButton from "@/components/form/SearchButton";
import SelectPosition from "@/components/form/SelectPosition";
import ViewList from "@/components/form/ViewList";
import Footer from "@/components/layout/Footer";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export default function Form() {
    console.log("Form re-rendered");

    const inputValueRef = useRef({
        "Full Name": "",
        Nationality: "",
        Position: [],
    });
    const [result, setResult] = useState([]);
    const { register, handleSubmit } = useForm();

    const mutation = useMutation({
        mutationFn: async (newPrev) => {
            const response = await fetch(
                `http://localhost:3001/players/findByFilters`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPrev),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }

            return response.json();
        },
        onSuccess: (newResult) => {
            setResult(newResult);
        },
        onError: (error) => {
            console.error("Error occurred:", error);
        },
    });

    const findByFilters = (newValue) => {
        mutation.mutate(newValue);
    };

    return (
        <>
            <form className="flex flex-col border-4 mt-28 p-2 border-black bg-lime-700">
                <ErrorProvider>
                    <InputForm
                        register={register}
                        placeholder={"이름"}
                        objectKey={"Full Name"}
                        ErrorContext={ErrorContext}
                    />
                    <InputForm
                        register={register}
                        placeholder={"국가"}
                        objectKey={"Nationality"}
                        ErrorContext={ErrorContext}
                    />

                    <div className="flex-initial"></div>
                    <SelectPosition inputValueRef={inputValueRef} />
                    <SearchButton
                        handleSubmit={handleSubmit}
                        inputValueRef={inputValueRef}
                        findByFilters={findByFilters}
                        ErrorContext={ErrorContext}
                    />
                    <div className="flex flex-col justify-center items-center">
                        <ViewList
                            loading={mutation.isLoading}
                            result={result}
                        />
                    </div>
                </ErrorProvider>
            </form>
            <Footer />
        </>
    );
}
