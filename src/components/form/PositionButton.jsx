import { useState } from "react";

export default function PositionButton({ togglePosition, position }) {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <>
            <button
                type="button"
                className={`p-2 border-2 rounded-xl border-black hover:opacity-70 ${isClicked ? "bg-slate-800" : "bg-slate-400"}`}
                onClick={() => {
                    setIsClicked(!isClicked);
                    togglePosition(position);
                }}
            >
                {position}
            </button>
        </>
    );
}
