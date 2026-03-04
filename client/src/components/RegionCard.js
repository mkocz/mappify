import { Link } from "react-router-dom";
import { IMGS_URL } from '../config';

const RegionCard = ({ region }) => {
    const { name, country, description, img, _id } = region
    
    return (
        <div className="max-w-sm m-auto rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition">
            <img
                src={IMGS_URL + img}
                alt={name}
                className="w-full h-84 object-cover"
            />
            <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-500 mb-2">{country}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {description}
                </p>
                <Link
                    to={`/regions/${_id}`}
                    className="inline-block px-4 py-2 bg-yellow-400 text-white rounded-xl hover:bg-yellow-700 transition"
                >
                    Show more
                </Link>
            </div>
        </div>
    );
}
export default RegionCard;
