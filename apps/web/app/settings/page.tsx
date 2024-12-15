// "use client";

// import { Card } from "@/apps/web/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/apps/web/components/ui/tabs";
// import { GeneralSettings } from "@/apps/web/components/settings/general-settings";
// import { BookingSettings } from "@/apps/web/components/settings/booking-settings";
// import { IntegrationSettings } from "@/apps/web/components/settings/integration-settings";

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