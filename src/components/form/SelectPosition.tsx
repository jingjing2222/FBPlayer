import PositionButton from "@/components/form/PositionButton";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

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

export default function SelectPosition({
    setValue,
}: {
    setValue: UseFormSetValue<{
        fullname: string;
        nationality: string;
        position: string[];
    }>;
}) {
    const [selectedPositions, setSelectedPositions] = useState<
        string[] | undefined
    >([]);

    const addPosition = (prevPositions: string[], position: string) => {
        const updatedPositions = prevPositions.filter(
            (existingPosition) => existingPosition !== position
        );
        setValue("position", updatedPositions);
        return updatedPositions;
    };
    function deletePosition(prevPositions: string[], position: string) {
        const updatedPositions = [...prevPositions, position];
        setValue("position", updatedPositions);
        return updatedPositions;
    }

    const togglePosition = (position: string) => {
        setSelectedPositions((prevPositions: string[] | undefined) => {
            return prevPositions?.includes(position)
                ? addPosition(prevPositions, position)
                : deletePosition(prevPositions!, position);
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
            <div className="flex flex-row items-start m-2 justify-between">
                <div className="flex-initial my-1 px-2 border-2 bg-teal-800 rounded-3xl text-slate-200 border-black">
                    {"선택된 포지션"}
                </div>
                <div className="flex-initial grid grid-cols-4">
                    {selectedPositions?.map((position, idx) => {
                        return (
                            <span
                                key={idx}
                                className="px-1 m-1 border-2 bg-orange-400 text-center rounded-2xl border-black"
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
