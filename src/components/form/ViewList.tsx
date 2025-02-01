import PlayerInform from "@/components/form/PlayerInform";

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

export default function ViewList({ result }: { result: Player[] | undefined }) {
    return (
        <>
            {result &&
                result.length > 0 &&
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
                                {eachInform["Full Name"]}
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
