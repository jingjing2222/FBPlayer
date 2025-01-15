import Nationality from "@/value/Nationality";
import { useState } from "react";

export default function SearchButton({
    handleSubmit,
    inputValueRef,
    findByFilters,
}) {
    const [showNoInput, setShowNoInput] = useState(false);
    return (
        <>
            <button
                className="flex-initial w-auto bg-slate-400"
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
                        findByFilters(newValue);
                    } else {
                        // 국가 입력이 틀렸거나 안햇을 경우
                        if (data.Nationality.length > 0) {
                            //국가 입력했을때
                            setShowNoInput(true);
                        } else {
                            // 국가 입력 안했을 경우 검색
                            newValue = {
                                ...data,
                                Position: prevValue.Position || [],
                            };
                            findByFilters(newValue);
                            inputValueRef.current = newValue;
                        }
                    }
                })}
            >
                제출
            </button>
            {showNoInput && (
                <div className="flex-initial w-auto text-red-400 bg-stone-500 text-center">
                    국가명 틀림 재입력 요망
                </div>
            )}
        </>
    );
}
