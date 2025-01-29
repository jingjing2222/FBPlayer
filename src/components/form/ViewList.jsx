import PlayerInform from "@/components/form/PlayerInform";

export default function ViewList({ result }) {
    return (
        <>
            {result &&
                result[0] &&
                result[0]["Full Name"] &&
                result.map((eachInform, idx) => {
                    return (
                        <div
                            className="flex-initial flex flex-col items-center border-2 border-black min-w-96 w-auto h-auto my-1 bg-violet-600 bg-opacity-60 pb-2"
                            key={idx}
                        >
                            <div
                                className="flex-initial font-serif font-bold text-lg"
                                key={`${eachInform["Image Link"]}div`}
                            >
                                {eachInform["Full Name"]}{" "}
                            </div>
                            <img
                                key={eachInform["Image Link"]}
                                className="flex-initial w-16"
                                src={`${eachInform["Image Link"]}`}
                            ></img>
                            <PlayerInform eachInform={eachInform} />
                        </div>
                    );
                })}
        </>
    );
}
