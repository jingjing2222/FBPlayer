export default function InputName({register}) {
    return (
        <>
            <input type="text" placeholder="name" {...register("Full Name")} />
            {}
        </>
    );
}
