interface IHeaderPages {
  title: string;
  children?: React.ReactNode;
  showChildren?: boolean;
}
export default function HeaderPages({
  title,
  children,
  showChildren,
}: IHeaderPages) {
  return (
    <div className="flex justify-between border-t-2 border-blue-300 p-3 ">
      <h3>{title}</h3>
      {showChildren && children}
    </div>
  );
}
