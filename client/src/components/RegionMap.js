import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconMap } from "../utils/iconMap";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegionMap = ({ sites, viewState, selectedSiteOnList = null, setSelectedSiteOnList = () => { } }) => {
    const [selectedSite, setSelectedSite] = useState(null);

    return (
        <>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                initialViewState={viewState}
                style={{
                    width: "100%",
                    height: "100%",
                    border: "3px solid #fdc700",
                    borderRadius: "20px"
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                {sites.map((site) => (
                    <Marker
                        key={site._id}
                        latitude={site.lat}
                        longitude={site.long}
                        anchor="bottom"
                    >
                        <div
                            onClick={() => {
                                setSelectedSite(site)
                            }}
                            onMouseEnter={() => setSelectedSiteOnList(site._id)}
                            onMouseLeave={() => setSelectedSiteOnList(null)}
                            className={`rounded-full border-2 border-white bg-red-500 cursor-pointer transition-transform duration-200 w-3 h-3 ease-in-out ${selectedSiteOnList === site._id ? "scale-200" : ""} hover:scale-200`}
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
                            <div className="me-2 mb-1">{iconMap[selectedSite.type]?.icon && <FontAwesomeIcon
                                icon={iconMap[selectedSite.type].icon}
                                color={iconMap[selectedSite.type].color}
                                className="me-2"
                            />}<strong>{selectedSite.name}</strong>
                            </div>
                            <Link
                                to={`/${selectedSite._id}`}
                                className="text-yellow-500 hover:text-yellow-600 cursor-pointer focus:border-none"
                            >
                                Show More
                            </Link>
                        </div>
                    </Popup>
                )}
            </Map>

        </>
    );
}
export default RegionMap;
