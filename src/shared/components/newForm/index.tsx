interface InewForm {
    children: React.ReactNode
}

export default function NewForm (Props: InewForm) {
    return (
        <form className="flex border-t border-gray-300 p-3 gap-2">
            {Props.children}
        </form>
    )
}