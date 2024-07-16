import { DATA_TYPE } from "@/shared/data";
import { ComponentProps, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPen } from "lucide-react"; // The edit icon

type EditButtonProps = {
  data: DATA_TYPE;
  handleEditUserData: (id: number, newData: DATA_TYPE) => void;
} & ComponentProps<"div">;

/* The body of the EditButton component */
const EditButton = ({
  data,
  handleEditUserData,
  ...props
}: EditButtonProps) => {
  const [currData, setCurrData] = useState<DATA_TYPE>(data);
  const handleUpdateData = <K extends keyof DATA_TYPE>(
    key: K,
    value: DATA_TYPE[K],
  ) => {
    setCurrData((prevData) => {
      return { ...prevData, [key]: value } as DATA_TYPE;
    });
  };

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button className="p-1 h-8 w-8">
          <UserPen className="stroke-2 w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User's Profile</DialogTitle>
          <DialogDescription>
            Make changes to the user's profile here. Click save when it's done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {["id", "email", "name", "role", "status"].map((key) => {
            return (
              <div
                className="grid grid-cols-4 items-center gap-4"
                key={`edit-${data.id}-${key}`}
              >
                <Label htmlFor={key} className="text-right">
                  {key}
                </Label>
                {key !== "role" && key !== "status" && (
                  <Input
                    id={key}
                    value={currData[key as keyof DATA_TYPE]}
                    className="col-span-3 h-7"
                    disabled={key === "id"}
                    type={key === "email" ? "email" : "text"}
                    onChange={(event) =>
                      handleUpdateData(
                        key as keyof DATA_TYPE,
                        event.target.value,
                      )
                    }
                  />
                )}
                {key === "role" && (
                  <Select
                    onValueChange={(value) =>
                      handleUpdateData("role", value as DATA_TYPE["role"])
                    }
                  >
                    <SelectTrigger id={key} className="h-7 col-span-3">
                      <SelectValue placeholder={currData.role} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {key === "status" && (
                  <Select
                    onValueChange={(value) =>
                      handleUpdateData("status", value as DATA_TYPE["status"])
                    }
                  >
                    <SelectTrigger id={key} className="h-7 col-span-3">
                      <SelectValue placeholder={currData.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => handleEditUserData(data.id, currData)}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
