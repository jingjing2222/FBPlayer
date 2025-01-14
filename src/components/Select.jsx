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

export default function Select({ setInputValue }) {
    // 선택된 포지션 상태 관리
    const [selectedPositions, setSelectedPositions] = useState([]);

    // 포지션 추가/제거 함수
    const togglePosition = (position) => {
        setSelectedPositions((prevPositions) => {
            if (prevPositions.includes(position)) {
                const updatedPositions = prevPositions.filter(
                    (existingPosition) => existingPosition !== position
                );
                setInputValue((prevValue) => ({
                    ...prevValue,
                    Position: updatedPositions,
                }));
                return updatedPositions;
            } else {
                const updatedPositions = [...prevPositions, position];
                setInputValue((prevValue) => ({
                    ...prevValue,
                    Position: updatedPositions,
                }));
                return updatedPositions;
            }
        });
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                {defaultPosition.map((position, idx) => (
                    // eslint-disable-next-line react/jsx-key
                    <PositionButton
                        position={position}
                        togglePosition={togglePosition}
                        key={idx}
                    />
                ))}
            </div>
            {/* 선택된 포지션 출력 */}
            <div>선택된 포지션: {selectedPositions.join(", ")}</div>
        </>
    );
}
