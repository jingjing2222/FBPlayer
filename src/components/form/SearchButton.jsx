import Nationality from "@/value/Nationality";
import { useContext } from "react";

export default function SearchButton({
    handleSubmit,
    inputValueRef,
    findByFilters,
    ErrorContext,
}) {
    const { setIsError } = useContext(ErrorContext);

    return (
        <>
            <button
                className="flex-initial w-auto bg-slate-400 border-2 border-black"
                onClick={handleSubmit((data) => {
                    const prevValue = inputValueRef.current;
                    let newValue;
                    if (data.Nationality in Nationality) {
                        const newData = {
                            ...data,
                            Nationality: Nationality[data.Nationality],
                        };
                        newValue = {
                            ...newData,
                            Position: prevValue.Position || [],
                        };
                        setIsError("");
                        findByFilters(newValue);
                    } else {
                        // 국가 입력이 틀렸거나 안햇을 경우
                        if (data.Nationality.length > 0) {
                            //국가 입력했을때
                            setIsError("국가명 틀림 재입력 요망");
                        } else {
                            // 국가 입력 안했을 경우 검색
                            newValue = {
                                ...data,
                                Position: prevValue.Position || [],
                            };
                            setIsError("");
                            findByFilters(newValue);
                            inputValueRef.current = newValue;
                        }
                    }
                })}
            >
                검색
            </button>
        </>
    );
}
