// "use client";

// import { taskColumns } from "@/components/bookings/columns";
// import { DataTable } from "@/components/bookings/data-table";
// import { TaskBoard } from "@/components/tasks/task-board";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Plus } from "lucide-react";
// import { useState } from "react";

// const tasks = [
//   {
//     id: "1",
//     title: "Clean Room 101",
//     assignedTo: "Jane Doe",
//     priority: "HIGH",
//     status: "PENDING",
//     dueDate: new Date("2024-03-21"),
//   },
//   // Add more sample tasks
// ];

// export default function TasksPage()
// {
//   const [view, setView] = useState<"list" | "board">("board");

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Tasks</h1>
//         <div className="flex gap-4">
//           <div className="flex rounded-lg border">
//             <Button
//               variant={view === "list" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => setView("list")}
//             >
//               List
//             </Button>
//             <Button
//               variant={view === "board" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => setView("board")}
//             >
//               Board
//             </Button>
//           </div>
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             New Task
//           </Button>
//         </div>
//       </div>

//       {view === "list" ? (
//         <Card className="p-6">
//           <DataTable columns={taskColumns} data={tasks} />
//         </Card>
//       ) : (
//         <TaskBoard tasks={tasks} />
//       )}
//     </div>
//   );
// }

export default function TasksPage()
{
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Tasks</h1>
            </div>
        </div>
    );
}