import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMap } from "../utils/iconMap";

const SiteList = ({ sites, selectedSite, setSelectedSite, navigate }) => {

    return (
        sites.map((site) => (
            <div
                key={site._id}
                onClick={() => navigate(`/${site._id}`)}
                onMouseEnter={() => setSelectedSite(site._id)}
                onMouseLeave={() => setSelectedSite(null)}
                className={`h-fit lg:w-full md:w-1/4 p-4 m-4 rounded-xl cursor-pointer shadow-md border transition-all duration-200 ${selectedSite === site._id
                    ? "bg-yellow-400 border-3 border-yellow-400 text-white"
                    : "bg-white border-3 hover:bg-yellow-400 border-yellow-400"}
                                `}
            >
                <div className="text-lg font-semibold">
                    {iconMap[site.type]?.icon && <FontAwesomeIcon
                        icon={iconMap[site.type].icon}
                        color={iconMap[site.type].color}
                        style={{ marginRight: '10px' }}
                    />}
                    {site.name}</div>
            </div>
        ))
    );
}

export default SiteList;
