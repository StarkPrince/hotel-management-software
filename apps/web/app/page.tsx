import Header from "@/apps/web/app/layout/header";
import { HomeAmenities } from "@/apps/web/components/guest/home/amentiies";
import { HomeHero } from "@/apps/web/components/guest/home/hero";


export default function Home()
{
    return (
        <main>
            <Header />
            <HomeHero />
            <HomeAmenities />
        </main>
    );
}