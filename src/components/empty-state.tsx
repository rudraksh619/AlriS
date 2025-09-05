import Image from "next/image";
interface Props {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <Image
        src={image} // path relative to /public
        alt="Logo"
        width={240}
        height={240}
      />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center mt-2">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
