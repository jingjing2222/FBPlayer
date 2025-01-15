export default function ViewList({ loading, result }) {
    return (
        <>
            {loading ? (
                <div>{"loading..."}</div>
            ) : (
                result &&
                result[0] &&
                result[0]["Full Name"] &&
                result.map((each) => {
                    return (
                        <>
                            <div
                                className="flex-initial"
                                key={`${each["Image Link"]}div`}
                            >
                                {each["Full Name"]}{" "}
                            </div>
                            <img
                                key={each["Image Link"]}
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
