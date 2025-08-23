import { JSX, useState } from "react";

import { Button } from "@/components/ui/button";

import { ResponsiveDialog } from "@/components/responsive-dialog";


export const useConfirm = (
  title: string,
  description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setpromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setpromise({ resolve });
    });
  };

  const handleClose = () => {
    setpromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      open={promise != null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div
        className="flex  flex-col-reverse w-full pt-4 gap-y-2 lg:flex-row
       gap-x-2 items-center justify-end"
      >
        <Button
          onClick={handleCancel}
          variant = "default"
          className="w-full lg:w-auto"
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="destructive"
          className="w-full lg:w-auto"
        >
          Confirm
        </Button>

      </div>
    </ResponsiveDialog>
  );
  return [ConfirmationDialog,confirm];
};
