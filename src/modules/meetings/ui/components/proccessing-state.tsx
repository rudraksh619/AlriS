import { EmptyState } from "@/components/empty-state";


export const Processingstate = () => {
  return (
    <div className="bg-white rounded px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title="Meeting completed"
        description="This meeting was completed successfully summary will appear soon"
      />
    </div>
  );
};
