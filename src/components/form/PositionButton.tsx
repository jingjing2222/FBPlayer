import { useState } from "react";

interface PositionButtonProps {
    togglePosition: (position: string) => void;
    position: string;
}

export default function PositionButton({
    togglePosition,
    position,
}: PositionButtonProps) {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <>
            <button
                type="button"
                className={`p-2 border-2 rounded-xl border-black hover:opacity-70 w-16 mx-2.5 ${
                    isClicked ? "bg-slate-800" : "bg-slate-400"
                }`}
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
