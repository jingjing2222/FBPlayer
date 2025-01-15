// @ts-ignore
export default function InputForm({ register, placeholder, objectKey }) {
    return (
        <>
            <input
                type="text"
                placeholder={placeholder}
                className="flex-initial m-2"
                {...register(objectKey)}
            />
            {}
        </>
    );
}
