import { useState } from "react";

export default function PlayerInform({ eachInform }) {
    const [showInform, setShowInform] = useState(false);

    return (
        <>
            <button
                type="button"
                className="rounded-lg border-2 bg-white text-black my-1 px-1 border-black"
                onClick={() => setShowInform(!showInform)}
            >
                {showInform ? "가리기" : "선수 정보 출력"}
            </button>
            {showInform && (
                <div>
                    {Object.entries(eachInform).map(([key, value]) => (
                        <div
                            className="bg-slate-300 my-1 rounded-xl px-3 mx-3 flex justify-between"
                            key={key}
                        >
                            <span className="text-blue-500 font-bold">
                                {key}:
                            </span>
                            <span className="text-black">{value}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
