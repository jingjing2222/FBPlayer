import { ErrorContext } from "@/context/ErrorContext";
import Nationality from "@/mock/Nationality";
import { useContext } from "react";

export default function SearchButton({
    handleSubmit,
    searchClick,
    getValues,
    setValue,
}) {
    const { ErrorOn, ErrorOff } = useContext(ErrorContext);

    return (
        <>
            <button
                className="flex-initial w-auto bg-slate-400 border-2 border-black"
                onClick={handleSubmit((data) => {
                    if (
                        !(data.nationality in Nationality) &&
                        data.nationality.length > 0
                    ) {
                        console.log("국가명 틀림");
                        ErrorOn();
                        return;
                    }
                    setValue(
                        "nationality",
                        data.nationality in Nationality
                            ? Nationality[data.nationality]
                            : ""
                    );
                    ErrorOff();
                    searchClick(getValues());
                })}
            >
                검색
            </button>
        </>
    );
}
