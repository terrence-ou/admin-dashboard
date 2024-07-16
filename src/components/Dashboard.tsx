import { useState } from "react";
import { DATA_TYPE, INIT_DATA } from "@/shared/data";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const headers = Object.keys(INIT_DATA[0]);

const getCellStyle = (key: string, value: string | number) => {
  if (key === "role") {
    switch (value) {
      case "Admin":
        return "font-bold";
      case "Manager":
        return "italic";
      default:
        return "";
    }
  } else if (key === "status") {
    switch (value) {
      case "Active":
        return "text-teal-600";
      case "Pending":
        return "text-amber-400";
      case "Inactive":
        return "text-red-600";
      default:
        return "";
    }
  }
  return "";
};

/*
  The body of the Dashboard component
*/
const Dashboard = () => {
  const [userData, setUserData] = useState<DATA_TYPE[]>(INIT_DATA);

  const handleDeleteUserData = (id: number) => {
    setUserData((prevData) => prevData.filter((data) => data.id !== id));
  };

  const handleUpdateUserData = (id: number, newData: DATA_TYPE) => {
    setUserData((prevData) =>
      prevData.map((data) => {
        if (data.id !== id) return data;
        return newData;
      }),
    );
  };

  return (
    <Table>
      <TableCaption>A list of current accounts.</TableCaption>
      {/* Table header */}
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
          <TableHead>actions</TableHead>
        </TableRow>
      </TableHeader>
      {/* Table body */}
      <TableBody>
        {userData.map((data) => {
          return (
            <TableRow key={data.id}>
              {Object.entries(data).map(([key, value]) => (
                // Table data
                <TableCell
                  className={getCellStyle(key, value)}
                  key={`${data.id}-${key}`}
                >
                  {value}
                </TableCell>
              ))}
              {/* Table controls: Edit and Delete */}
              <TableCell className="flex gap-1 justify-center items-center">
                <EditButton
                  data={data}
                  handleEditUserData={handleUpdateUserData}
                />
                <DeleteButton
                  data={data}
                  handleDeleteUserData={handleDeleteUserData}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Dashboard;
