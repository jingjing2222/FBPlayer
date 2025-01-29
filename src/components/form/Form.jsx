import { ErrorProvider } from "@/context/ErrorContext";
import { InputForm } from "@/components/form/InputForm";
import SearchButton from "@/components/form/SearchButton";
import SelectPosition from "@/components/form/SelectPosition";
import ViewList from "@/components/form/ViewList";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Form() {
    console.log("Form re-rendered");

    const [result, setResult] = useState([]);
    const { register, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            fullname: "",
            nationality: "",
            position: [],
        },
    });

    function searchClick(data) {
        console.log(data);
    }

    return (
        <>
            <form className="flex flex-col border-4 p-2 border-black bg-lime-700">
                <ErrorProvider>
                    <InputForm
                        register={register}
                        placeholder={"이름"}
                        objectKey={"fullname"}
                    />
                    <InputForm
                        register={register}
                        placeholder={"국가"}
                        objectKey={"nationality"}
                    />

                    <div className="flex-initial"></div>
                    <SelectPosition setValue={setValue} />
                    <SearchButton
                        handleSubmit={handleSubmit}
                        getValues={getValues}
                        setValue={setValue}
                        searchClick={searchClick}
                    />
                    <div className="flex flex-col justify-center items-center">
                        <ViewList result={result} />
                    </div>
                </ErrorProvider>
            </form>
        </>
    );
}
