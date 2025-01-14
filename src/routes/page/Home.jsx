import Papa from "papaparse";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
    const [inputValue, setInputvalue] = useState("");
    // @ts-ignore
    const { register, handleSubmit } = useForm();

    return (
        <>
            <div className="flex flex-col m-auto w-auto h-auto border-slate-950 border-4 justify-around">
                <textarea
                    className="flex-initial p-10 w-auto h-auto border-4"
                    placeholder="csv"
                    {...register("inputValue")}
                ></textarea>
                <button
                    onClick={handleSubmit((data) =>
                        // @ts-ignore
                        setInputvalue(() =>
                            Papa.parse(
                                // @ts-ignore
                                '상호,우편번호,주소,업태,메뉴,전화번호,지정연도,데이터기준일자 조마루뼈다귀서귀포점,63587,제주특별자치도 서귀포시 동홍동로 13,한식,뼈다귀해장국,064-763-4417,2020,2023-12-04 서귀포갈비,63589,제주특별자치도 서귀포시 동홍로 42,한식,"양념갈비,냉면",064-762-2323,2020,2023-12-04',
                                { headers: true }
                            )
                        )
                    )}
                >
                    convert
                </button>
                <textarea
                    className="flex-initial p-10 w-auto h-auto border-4"
                    placeholder="json"
                    value={inputValue}
                ></textarea>
            </div>
        </>
    );
}
