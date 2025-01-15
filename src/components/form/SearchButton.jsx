import Nationality from "@/value/Nationality";

export default function SearchButton({
    handleSubmit,
    inputValueRef,
    findByID,
}) {
    return (
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
                } else {
                    newValue = {
                        ...data,
                        Position: prevValue.Position || [],
                    };
                }
                findByID(newValue);
                inputValueRef.current = newValue;
            })}
        >
            제출
        </button>
    );
}
