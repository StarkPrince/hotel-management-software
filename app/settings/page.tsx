// "use client";

// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { GeneralSettings } from "@/components/settings/general-settings";
// import { BookingSettings } from "@/components/settings/booking-settings";
// import { IntegrationSettings } from "@/components/settings/integration-settings";

// export default function SettingsPage() {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Settings</h1>
//       <Tabs defaultValue="general" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="general">General</TabsTrigger>
//           <TabsTrigger value="booking">Booking</TabsTrigger>
//           <TabsTrigger value="integrations">Integrations</TabsTrigger>
//         </TabsList>
//         <TabsContent value="general">
//           <Card className="p-6">
//             <GeneralSettings />
//           </Card>
//         </TabsContent>
//         <TabsContent value="booking">
//           <Card className="p-6">
//             <BookingSettings />
//           </Card>
//         </TabsContent>
//         <TabsContent value="integrations">
//           <Card className="p-6">
//             <IntegrationSettings />
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

export default function SettingsPage()
{
  return <div>Settings</div>;
}