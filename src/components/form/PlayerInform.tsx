import { useState } from "react";

interface Player {
    "Known As": string;
    "Full Name": string;
    Overall: number;
    Potential: number;
    "Value(in Dallor)": string;
    "Best Position": string;
    Nationality: string;
    "Image Link": string;
    Age: number;
    "Height(in cm)": number;
    "Weight(in kg)": number;
    "Club Name": string;
    "Club Jersey Number": string;
    "Preferred Foot": string;
    "National Team Image Link": string;
    "National Team Position": string;
    "Pace Total": number;
    "Shooting Total": number;
    "Passing Total": number;
    "Dribbling Total": number;
    "Defending Total": number;
    "Physicality Total": number;
    Crossing: number;
    Finishing: number;
    "Heading Accuracy": number;
    "Short Passing": number;
    Volleys: number;
    Dribbling: number;
    Curve: number;
    "Freekick Accuracy": number;
    LongPassing: number;
    BallControl: number;
    Acceleration: number;
    "Sprint Speed": number;
    Agility: number;
    Reactions: number;
    Balance: number;
    "Shot Power": number;
    Jumping: number;
    Stamina: number;
    Strength: number;
    "Long Shots": number;
    Aggression: number;
    Interceptions: number;
    Positioning: number;
    Vision: number;
    Penalties: number;
    Composure: number;
    Marking: number;
    "Standing Tackle": number;
    "Sliding Tackle": number;
    "Goalkeeper Diving": number;
    "Goalkeeper Handling": number;
    GoalkeeperKicking: number;
    "Goalkeeper Positioning": number;
    "Goalkeeper Reflexes": number;
}

export default function PlayerInform({ eachInform }: { eachInform: Player }) {
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
