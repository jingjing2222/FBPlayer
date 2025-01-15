export default function ViewList({ loading, result }) {
    return (
        <>
            {loading ? (
                <div>{"loading..."}</div>
            ) : (
                result &&
                result[0] &&
                result[0]["Full Name"] &&
                result.map((each, idx) => {
                    return (
                        <>
                            <div className="flex-initial" key={idx}>
                                {each["Full Name"]}{" "}
                            </div>
                            <img
                                className="flex-initial w-16"
                                src={`${each["Image Link"]}`}
                            ></img>
                        </>
                    );
                })
            )}
        </>
    );
}
