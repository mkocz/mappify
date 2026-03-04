import { Link } from "react-router-dom";

const Breadcrumps = ({ region, site }) => {

    return (
        <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
            <div className="flex items-center gap-1">
                <Link to={`/regions/${region._id}`} className="text-blue-600 hover:underline">
                    {region.name}
                </Link>
                <span className="text-blue-750">/</span>
                <span className="text-gray-500">{site}</span>
            </div>
        </nav>
    );
}
export default Breadcrumps;