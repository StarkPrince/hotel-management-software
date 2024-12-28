import { Button } from "@/apps/web/components/ui/button";
import
  {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
  } from "@/apps/web/components/ui/card";
import { Car, Hotel, Utensils, Wifi } from "lucide-react";
import Link from "next/link";

export default function Home()
{
  const features = [
    {
      icon: <Hotel className="h-6 w-6" />,
      title: "Luxurious Rooms",
      description: "Experience comfort in our carefully designed rooms",
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Fine Dining",
      description: "Savor exquisite cuisine at our restaurants",
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "High-Speed WiFi",
      description: "Stay connected with complimentary high-speed internet",
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Valet Parking",
      description: "Convenient parking service for all guests",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Welcome to LuxStay
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Experience luxury and comfort in the heart of the city
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/rooms">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                  Book Now
                </Button>
              </Link>
              <Link href="/amenities">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  View Amenities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}