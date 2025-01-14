import { useState } from "react";

export default function PositionButton({ togglePosition, position }) {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <>
            <button
                type="button"
                className={`p-2 border-2 ${isClicked ? "bg-slate-600" : "bg-slate-400"}`}
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
