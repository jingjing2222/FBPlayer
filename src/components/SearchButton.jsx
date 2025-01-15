export default function SearchButton({
    handleSubmit,
    inputValueRef,
    findByID,
}) {
    return (
        <button
            className="flex-initial w-auto bg-slate-400"
            onClick={handleSubmit((data) => {
                const prevValue = inputValueRef;
                const newValue = { ...prevValue, ...data };
                findByID(newValue);
                console.log(newValue);
                inputValueRef = newValue;
            })}
        >
            제출
        </button>
    );
}
