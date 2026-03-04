import "mapbox-gl/dist/mapbox-gl.css";
import { useContext } from "react";
import RegionCard from "./RegionCard";
import HeroMap from "./HeroMap";
import { RegionsContext } from "../context/RegionsContext";
import Container from "./Container";

const Home = () => {
    const { regions } = useContext(RegionsContext);

    return (
        <div className="m-auto"
        >
            <div className="relative w-full h-[50vh] border-b-[3px] border-[#162556]">
                {regions && <HeroMap regions={regions} />}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-full md:w-[80%] bg-gradient-to-r from-[#0a122b]/90 md:via-[#0a122b]/70 md:via-55% to-[#0a122b]/70 md:to-transparent">
                </div>
                <Container className="absolute z-20 top-1/4">
                    <div className="relative text-white">
                        <h1 className="text-4xl font-bold">Explore amazing places</h1>
                        <p className="mt-2 text-lg">Go on a virtual journey around the world</p>
                    </div>
                </Container>
            </div>
            <Container>
                <h1 className="text-3xl font-bold text-gray-800 my-4">Regions</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {regions.map((region) => (
                        <RegionCard key={region._id} region={region} />
                    ))}
                </div>
            </Container>
        </div >
    );
}
export default Home;
