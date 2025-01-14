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
                            <div key={idx}>
                                {each["Full Name"]}{" "}
                                <img src={`${each["Image Link"]}`}></img>
                            </div>
                        </>
                    );
                })
            )}
        </>
    );
}
