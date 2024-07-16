import { ComponentProps } from "react";
import { DATA_TYPE } from "@/shared/data";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; // Delete Icon

type DeleteButtonProps = {
  data: DATA_TYPE;
  handleDeleteUserData: (id: number) => void;
} & ComponentProps<"div">;

/* The body of the DeleteButton component */
const DeleteButton = ({
  data,
  handleDeleteUserData,
  ...props
}: DeleteButtonProps) => {
  return (
    <Dialog {...props}>
      {/* The button displaying on the table */}
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-1 h-8">
          <X className="stroke-2 w-4 h-4" />
        </Button>
      </DialogTrigger>
      {/* The body of the modal */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="pt-3">
            This action cannot be undone. This will permanently delete the
            account and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>
        {/* The user info */}
        <div>
          <h3 className="font-semibold mb-2">Account Information:</h3>
          {["id", "name", "email"].map((key) => (
            <p className="text-sm" key={`dialog-${key}-${data.id}`}>
              <span className="italic pr-3">{key}:</span>
              {data[key as keyof DATA_TYPE]}
            </p>
          ))}
        </div>
        {/* Control buttons at the bottom of the modal interface */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => handleDeleteUserData(data.id)}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
