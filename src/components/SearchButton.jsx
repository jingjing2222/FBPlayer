export default function SearchButton({
    handleSubmit,
    setLoading,
    setInputValue,
    findByID,
}) {
    return (
        <button
            className="flex-initial w-auto bg-slate-400"
            onClick={handleSubmit((data) => {
                // @ts-ignore
                setInputValue((prev) => {
                    const newPrev = { ...prev, ...data };
                    findByID(newPrev);
                    console.log(newPrev);
                    return newPrev;
                });
                setLoading(true);
            })}
        >
            제출
        </button>
    );
}
