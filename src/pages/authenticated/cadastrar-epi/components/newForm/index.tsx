interface INewForm {
  children: React.ReactNode;
}

export default function NewForm({ children }: INewForm) {
  return (
    <form className="flex border-t border-gray-300 p-3 gap-2">{children}</form>
  );
}
