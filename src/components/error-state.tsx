import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1  justify-center items-center w-full ">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <AlertCircleIcon className="size-6 text-red-500 " />
        <div className="flex flex-col gap-y-2 text-center">
          <p className="text-lg font-medium">{description}</p>
          <h6 className="text-sm">{title}</h6>
        </div>
      </div>
    </div>
  );
};
