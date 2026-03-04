import { API_URL, IMGS_URL } from '../config';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumps from './Breadcrumps';
import RegionMap from './RegionMap';
import Container from './Container';

const SitePage = () => {
    const [site, setSite] = useState(null)
    const [sites, setSites] = useState([])
    const { siteId } = useParams()
    const [mainImage, setMainImage] = useState(null)

    useEffect(() => {
        fetch(`${API_URL}api/sites/${siteId}`)
            .then(res => res.json()
            )
            .then(data => {
                setSite(data.site)
                setSites(data.sites)
                if (data) setMainImage(IMGS_URL + data.site.images[0])
            })
            .catch(err => console.error("Error fetching site:", err));
    }, [siteId])

    return (
        site && <>
            <Container>
                <Breadcrumps region={site.region} site={site.name} />
                <div className="grid grid-cols-1 md:grid-cols-3 w-full my-5">
                    <div className="col-span-2 m-auto flex flex-col md:pe-6">
                        <h1 className="text-4xl w-[90%] font-bold mb-4 text-blue-950">{site.name}</h1>
                        <Link to={`/regions/${site.region._id}`} className="block w-[90%]">
                            <h2 className="text-xl w-[90%] font-bold mb-4 text-yellow-500 hover:text-yellow-700">{site.region.name}</h2>
                        </Link>
                        <p className="text-lg text-gray-700 text-left mb-8">
                            {site.desc}
                        </p>
                    </div>

                    <div className='md:col-span-1 w-full h-[50vh] md:h-full'>
                        <RegionMap
                            key={site._id}
                            viewState={{
                                latitude: site.lat,
                                longitude: site.long,
                                zoom: 8,
                            }}
                            sites={sites}
                            selectedSiteOnList={site._id}
                        />
                    </div>
                </div>
            </Container>
            <div className='bg-blue-950 w-full pt-10'>
                <img
                    src={mainImage}
                    alt={site.name}
                    className="rounded-[20px] border-2 border-yellow-500 max-w-[90%] max-h-124 object-cover m-auto"
                />
            </div>
            <div className="flex flex-wrap justify-center gap-4 w-full p-6 bg-blue-950">
                {site.images.map((img, index) => (
                    <img
                        key={index}
                        src={IMGS_URL + img}
                        alt={`Thumbnail ${site.name}`}
                        className={`rounded-lg shadow cursor-pointer h-36 w-40 object-cover hover:opacity-80 transition  ${mainImage === IMGS_URL + img ? "opacity-50 border-4 border-yellow-500" : "hover:opacity-70"}`}
                        onClick={() => setMainImage(IMGS_URL + img)}
                    />
                ))}
            </div>
        </>
    );
};

export default SitePage;
