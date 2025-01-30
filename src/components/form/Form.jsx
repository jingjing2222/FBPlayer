import SelectPosition from "@/components/form/SelectPosition";
import ViewList from "@/components/form/ViewList";
import Nationality from "@/mock/Nationality";
import { useState } from "react";
import { useForm } from "react-hook-form";

//주석을 추가합니다

export default function Form() {
    const [result] = useState([]);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        defaultValues: {
            fullname: "",
            nationality: "",
            position: [],
        },
    });

    function searchClick(data) {
        const newData = { ...data, nationality: Nationality[data.nationality] };
        console.log(newData);
    }

    return (
        <form className="flex flex-col border-4 p-2 border-black bg-lime-700">
            <input
                type="text"
                placeholder={"이름"}
                className="flex-initial m-2 rounded-md px-1 border-black border-2"
                {...register("fullname")}
            />
            <input
                type="text"
                placeholder={"국가"}
                className="flex-initial m-2 rounded-md px-1 border-black border-2"
                {...register("nationality", {
                    validate: {
                        incorrectnationality: (data) =>
                            data.length > 0 &&
                            !(data in Nationality) &&
                            "국가명 없음",
                    },
                })}
            />
            <div className="text-center text-red-500 mb-2">
                {errors.nationality?.message}
            </div>
            <div className="flex-initial"></div>
            <SelectPosition setValue={setValue} />
            <button
                className="flex-initial w-auto bg-slate-400 border-2 border-black"
                onClick={handleSubmit(searchClick)}
            >
                검색
            </button>
            <div className="flex flex-col justify-center items-center">
                <ViewList result={result} />
            </div>
        </form>
    );
}
