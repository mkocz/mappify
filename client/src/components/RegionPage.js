import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, IMGS_URL } from '../config';
import Hero from "./Hero";
import SiteList from "./SiteList";
import RegionMap from "./RegionMap";
import Container from "./Container";

const RegionPage = () => {
    const [sites, setSites] = useState([]);
    const [region, setRegion] = useState(null);
    const [selectedSite, setSelectedSite] = useState(null);
    const navigate = useNavigate()
    const { regionId } = useParams()

    useEffect(() => {
        fetch(`${API_URL}api/regions/${regionId}`)
            .then(res => res.json()
            )
            .then(data => {
                setRegion(data)
                setSites(data.sites);
            })
            .catch(err => {
                console.error("Error fetching region:", err);
            });
    }, [regionId]);

    return (
        <div className="m-auto bg-blue-950">
            {region && <>
                <Hero heroImg={`${IMGS_URL}/${region.img}`} />
                <Container>
                    <div className="py-6 text-white">
                        <h1 className="text-2xl md:text-4xl font-bold mb-8">
                            {region.name}
                        </h1>
                        <div>{region.description}</div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 bg-blue-950 pb-8">
                        <div className="flex flex-col md:flex-row md:flex-wrap grid-cols-1 md:grid-cols-3 lg:grid-cols-1 h-fit justify-center">
                            <SiteList
                                sites={sites}
                                selectedSite={selectedSite}
                                setSelectedSite={setSelectedSite}
                                navigate={navigate}
                            />
                        </div>
                        <div className="lg:col-span-3 min-h-[50vh] md:ps-8">
                            {regionId && <RegionMap
                                key={`${region.lat}-${region.long}`}
                                viewState={{
                                    latitude: region.lat,
                                    longitude: region.long,
                                    zoom: region.zoom,
                                }}
                                sites={sites}
                                setSelectedSiteOnList={setSelectedSite}
                                selectedSiteOnList={selectedSite}
                            />}
                        </div>
                    </div>
                </Container >
            </>
            }
        </div >
    );
}
export default RegionPage;
