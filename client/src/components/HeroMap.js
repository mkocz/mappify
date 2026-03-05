import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { useState } from "react";
import { Link } from 'react-router-dom';

const HeroMap = ({ regions }) => {
    const [selectedSite, setSelectedSite] = useState(null);

    return (
        <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
            initialViewState={{
                latitude: 38.7,
                longitude: -25,
                zoom: 2,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            {regions.map((region) => (
                <Marker
                    key={region._id}
                    latitude={region.lat}
                    longitude={region.long}
                    anchor="bottom"
                >
                    <div
                        onClick={() => {
                            setSelectedSite(region)
                        }}
                        className="rounded-full border-2 border-white bg-red-500 cursor-pointer w-3 h-3"
                    />
                </Marker>
            ))}
            {selectedSite && (
                <Popup
                    latitude={selectedSite.lat}
                    longitude={selectedSite.long}
                    anchor="top"
                    closeOnClick={false}
                    onClose={() => setSelectedSite(null)}
                >
                    <div className="p-1 pe-3">
                        Go to{" "}
                        <Link
                            to={`/regions/${selectedSite._id}`}
                            className="text-yellow-500 hover:text-yellow-600 cursor-pointer focus:border-none"
                        >
                            {selectedSite.name}
                        </Link>
                    </div>
                </Popup>
            )}</Map>)
}

export default HeroMap;
