import PositionButton from "@/components/PositionButton";
import { useState } from "react";

// 기본 포지션 배열
const defaultPosition = [
    "CAM",
    "CB",
    "CDM",
    "CF",
    "CM",
    "GK",
    "LB",
    "LM",
    "LW",
    "LWB",
    "RB",
    "RM",
    "RW",
    "RWB",
    "ST",
];

export default function SelectPosition({ inputValueRef }) {
    const [selectedPositions, setSelectedPositions] = useState([]);

    const togglePosition = (position) => {
        setSelectedPositions((prevPositions) => {
            if (prevPositions.includes(position)) {
                const updatedPositions = prevPositions.filter(
                    (existingPosition) => existingPosition !== position
                );
                const prevValue = inputValueRef;
                inputValueRef = {
                    ...prevValue,
                    Position: updatedPositions,
                };
                return updatedPositions;
            } else {
                const updatedPositions = [...prevPositions, position];
                const prevValue = inputValueRef;
                inputValueRef = {
                    ...prevValue,
                    Position: updatedPositions,
                };
                return updatedPositions;
            }
        });
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                {defaultPosition.map((position, idx) => (
                    <PositionButton
                        position={position}
                        togglePosition={togglePosition}
                        key={idx}
                    />
                ))}
            </div>
            <div className="flex flex-row items-start">
                <div className="flex-initial my-1 px-1 border-2">
                    선택된 포지션
                </div>
                <div className="flex-initial grid grid-cols-4">
                    {selectedPositions.map((position, idx) => {
                        return (
                            <span
                                key={idx}
                                className="px-1 m-1 border-2 bg-orange-400"
                            >
                                {position}
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
