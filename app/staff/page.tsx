// "use client";

// import { Card } from "@/components/ui/card";
// import { DataTable } from "@/components/bookings/data-table";
// import { bookingColumns } from "@/components/bookings/columns";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import { useState } from "react";
// import { AddStaffDialog } from "@/components/staff/add-staff-dialog";

// const staff = [
//   {
//     id: "1",
//     name: "John Smith",
//     email: "john@example.com",
//     role: "MANAGER",
//     department: "Front Desk",
//     status: "ACTIVE",
//     joinDate: new Date("2023-01-15"),
//   },
//   // Add more sample staff
// ];

// export default function StaffPage() {
//   const [showAddStaff, setShowAddStaff] = useState(false);

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Staff Management</h1>
//         <Button onClick={() => setShowAddStaff(true)}>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Staff
//         </Button>
//       </div>
//       <Card className="p-6">
//         <DataTable columns={bookingColumns} data={staff} />
//       </Card>
//       <AddStaffDialog open={showAddStaff} onOpenChange={setShowAddStaff} />
//     </div>
//   );
// }

export default function StaffPage()
{
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Staff Management</h1>
            </div>
        </div>
    );
}