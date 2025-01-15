export default function SearchButton({
    handleSubmit,
    setInputValue,
    findByID,
}) {
    return (
        <button
            className="flex-initial w-auto bg-slate-400"
            onClick={handleSubmit((data) => {
                // @ts-ignore
                setInputValue((prevValue) => {
                    const newValue = { ...prevValue, ...data };
                    findByID(newValue);
                    console.log(newValue);
                    return newValue;
                });
            })}
        >
            제출
        </button>
    );
}
