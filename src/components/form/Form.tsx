import SelectPosition from "@/components/form/SelectPosition";
import ViewList from "@/components/form/ViewList";
import Nationality from "@/mock/Nationality";
import { useInfiniteQuery } from "@tanstack/react-query";

import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

interface DataType {
    fullname?: string;
    nationality?: string;
    position?: string[];
}

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

function searchClick(data: DataType) {
    const newData = data?.nationality
        ? { ...data, nationality: Nationality[data.nationality] }
        : { ...data };

    const fullname = newData?.fullname ? `fullname=${newData?.fullname}&` : ``;
    const nationality = newData?.nationality
        ? `nationality=${newData?.nationality}&`
        : ``;
    const position =
        newData?.position && newData?.position.length > 0
            ? `${newData?.position
                  .map((each) => `position=${each}`)
                  .join("&")}&`
            : ``;

    return `${fullname}${nationality}${position}`;
}

async function fetchPlayer(data: DataType | undefined, pageParam: number) {
    const result = await fetch(
        `${import.meta.env.VITE_URL}/players?${searchClick(
            data!
        )}offset=${pageParam}&limit=50`,
        {
            method: "GET",
        }
    );
    console.log(pageParam);

    const response = await result.json();
    return response;
}

export default function Form() {
    const [searchData, setSearchData] = useState<DataType | undefined>({});
    const [enabled, setEnabled] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        defaultValues: {
            fullname: "",
            nationality: "",
            position: [""],
        },
    });

    const { data, status, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["fetchPlayer", searchData],
            queryFn: ({ pageParam }) => fetchPlayer(searchData, pageParam),
            initialPageParam: 0,
            getNextPageParam: (lastPage) => {
                return lastPage.last_index + 1;
            },
            enabled: enabled,
        });

    const search = (data: SetStateAction<DataType | undefined>) => {
        setSearchData(data);
        if (!enabled) setEnabled(true);
    };

    const allData: Player[] | undefined = data?.pages.flatMap(
        (page) => page.data
    );

    return (
        <form
            className="flex flex-col border-4 border-black bg-lime-700"
            onSubmit={handleSubmit(search)}
        >
            <input
                type="text"
                placeholder={"이름"}
                className="flex-initial rounded-md px-1 border-black border-2 m-2 bg-white"
                {...register("fullname")}
            />
            <input
                type="text"
                placeholder={"국가"}
                className="flex-initial m-2 rounded-md px-1 border-black border-2 bg-white"
                {...register("nationality", {
                    validate: {
                        ncorrectnationality: (data) => {
                            if (data.length === 0) return true;
                            if (data in Nationality) return true;
                            return "국가명 없음";
                        },
                    },
                })}
            />
            <div className="text-center text-red-500 mb-2">
                {errors.nationality?.message}
            </div>
            <div className="flex-initial"></div>
            <SelectPosition setValue={setValue} />
            <button
                type="submit"
                className="flex-initial w-auto bg-slate-400 border-2 hover:bg-slate-600 border-black"
            >
                검색
            </button>
            {enabled && isFetchingNextPage ? (
                <div>Loading</div>
            ) : status === "error" ? (
                <div>{`error`}</div>
            ) : (
                status === "success" && (
                    <>
                        <div className="flex flex-col justify-center items-center">
                            <ViewList result={allData} />
                        </div>
                        <button
                            className="text-lg bg-amber-500 border-4 mb-2 hover:bg-amber-700"
                            onClick={() => {
                                fetchNextPage();
                            }}
                        >
                            More
                        </button>
                    </>
                )
            )}
        </form>
    );
}
