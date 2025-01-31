import SelectPosition from "@/components/form/SelectPosition";
import ViewList from "@/components/form/ViewList";
import Nationality from "@/mock/Nationality";
import { useState } from "react";
import { useForm } from "react-hook-form";

function searchClick(data) {
    const newData = { ...data, nationality: Nationality[data.nationality] };
    const fullname = newData?.fullname ? `fullname=${newData?.fullname}&` : ``;
    const nationality = newData?.nationality
        ? `nationality=${newData?.nationality}&`
        : ``;
    const position =
        newData?.position.length > 0
            ? `${newData?.position.map((each) => `position=${each}`).join("&")}&`
            : ``;

    return `${fullname}${nationality}${position}`;
}

async function fetchPlayer(data, setResult) {
    const result = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_URL}/players?${searchClick(data)}offset=0&limit=20`,
        {
            method: "GET", // *GET, POST, PUT, DELETE 등
        }
    );

    const response = await result.json();
    setResult(response.data);
}

export default function Form() {
    const [result, setResult] = useState([]);
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

    return (
        <form
            className="flex flex-col border-4 p-2 border-black bg-lime-700"
            onSubmit={handleSubmit((data) => fetchPlayer(data, setResult))}
        >
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
                        ncorrectnationality: (data) => {
                            if (data.length === 0) return true;
                            if (data in Nationality) return true;
                            return "국가명 없음";
                        },
                    },
                })}
            />
            <div className="text-center text-red-500 mb-2">
                {errors.nationality?.message}
            </div>
            <div className="flex-initial"></div>
            <SelectPosition setValue={setValue} />
            <button
                type="submit"
                className="flex-initial w-auto bg-slate-400 border-2 border-black"
            >
                검색
            </button>
            <div className="flex flex-col justify-center items-center">
                <ViewList result={result} />
            </div>
        </form>
    );
}
