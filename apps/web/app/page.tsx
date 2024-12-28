"use client"

import { Button } from "@/apps/web/components/ui/button";
import
{
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/apps/web/components/ui/card";
import { motion } from "framer-motion";
import { Car, Hotel, Star, Utensils, Wifi } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function Home()
{
  const features = [
    {
      icon: <Hotel className="h-8 w-8 text-primary" />,
      title: "Luxurious Rooms",
      description: "Experience unparalleled comfort in our meticulously designed suites",
    },
    {
      icon: <Utensils className="h-8 w-8 text-primary" />,
      title: "Fine Dining",
      description: "Indulge in exquisite cuisine crafted by world-class chefs",
    },
    {
      icon: <Wifi className="h-8 w-8 text-primary" />,
      title: "High-Speed WiFi",
      description: "Stay seamlessly connected with our complimentary high-speed internet",
    },
    {
      icon: <Car className="h-8 w-8 text-primary" />,
      title: "Valet Parking",
      description: "Enjoy the convenience of our premium valet parking service",
    },
  ];

  const testimonials = [
    {
      quote: "An unforgettable experience of luxury and comfort.",
      author: "Emily S., New York",
      rating: 5,
    },
    {
      quote: "The epitome of elegance and exceptional service.",
      author: "Michael L., London",
      rating: 5,
    },
    {
      quote: "A true oasis in the heart of the city.",
      author: "Sophie T., Paris",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661903136240-a97367001a64"
          alt="Luxury Hotel Lobby"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center space-y-6 max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
          >
            Welcome to LuxStay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Experience unparalleled luxury and comfort in the heart of the city
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-x-4"
          >
            <Link href="/rooms">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                Book Now
              </Button>
            </Link>
            <Link href="/amenities">
              <Button size="lg" variant="outline" className="text-white bg-primary hover:bg-white hover:text-black">
                Explore Amenities
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Experience Luxury</h2>
          <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="p-2 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Guest Experiences</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg font-medium mb-4">"{testimonial.quote}"</blockquote>
                    <cite className="text-sm text-gray-600">- {testimonial.author}</cite>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl mb-8">Book your stay now and indulge in unparalleled comfort and elegance.</p>
          <Link href="/rooms">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Book Your Stay
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
