import type { ComponentProps } from "react";

type InputProps = ComponentProps<'input'>;

export default function Input(props: InputProps) {
    return (
        <input 
            className="bg-white px-3 rounded-md border border-blue-400 w-full"
            {...props}
        />
    )
}