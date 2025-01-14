import SearchButton from "@/components/SearchButton";
import Select from "@/components/Select";
import ViewList from "@/components/ViewList";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Form() {
    const [inputValue, setInputValue] = useState({
        "Full Name": "",
        Nationality: "",
        Position: [],
    });
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    // @ts-ignore
    async function findByID(newPrev) {
        try {
            const result = await fetch(
                `http://localhost:3001/players/findByFilters`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // JSON 데이터 전송
                    },
                    body: JSON.stringify(newPrev), // JSON 데이터 직렬화
                }
            );

            if (!result.ok) {
                throw new Error(`Error: ${result.status} ${result.statusText}`);
            }

            const data = await result.json();
            setResult(data);
            setLoading(false);
        } catch (error) {
            console.error("Error occurred:", error.message);
        }
    }

    return (
        <>
            <form className="flex flex-col border-4">
                <input
                    type="text"
                    placeholder="name"
                    {...register("Full Name")}
                />
                <div className="flex-initial"></div>
                <Select setInputValue={setInputValue} />
                <SearchButton
                    handleSubmit={handleSubmit}
                    setLoading={setLoading}
                    setInputValue={setInputValue}
                    findByID={findByID}
                />
                <ViewList loading={loading} result={result} />
            </form>
        </>
    );
}
