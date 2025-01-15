import InputName from "@/components/InputName";
import SearchButton from "@/components/SearchButton";
import SelectPosition from "@/components/SelectPosition";
import ViewList from "@/components/ViewList";
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

            return response.json(); // 데이터 반환
        },
        onMutate: () => {
            console.log("Mutation Start");
        },
        onSuccess: (data) => {
            setResult(data);
        },
        onError: (error) => {
            console.error("Error occurred:", error);
        },
    });

    const findByID = (newValue) => {
        mutation.mutate(newValue); // mutate 함수 호출
    };

    return (
        <>
            <form className="flex flex-col border-4 mt-28">
                <InputName register={register} />
                <div className="flex-initial"></div>
                <SelectPosition inputValueRef={inputValueRef.current} />
                <SearchButton
                    handleSubmit={handleSubmit}
                    inputValueRef={inputValueRef.current}
                    findByID={findByID}
                />
                <div className="flex flex-col justify-center items-center">
                    <ViewList loading={mutation.isLoading} result={result} />
                </div>
            </form>
        </>
    );
}
