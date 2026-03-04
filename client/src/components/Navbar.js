import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { RegionsContext } from '../context/RegionsContext';

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { regions } = useContext(RegionsContext);

    return (
        <nav className="bg-blue-950 px-6 md:px-12 py-4">
            <div className="max-w-7xl mx-auto flex justify-between">
                <div>
                    <FontAwesomeIcon icon={faGlobe} className="text-yellow-500 pe-1 pb-2" />
                    <Link to="/" className="text-yellow-400 text-xl me-1">
                        Mappify
                    </Link>
                </div>
                <div className='relative'>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center text-white font-medium focus:outline-none cursor-pointer"
                    >
                        Regions
                        <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-5 overflow-hidden">
                            {regions.length && (
                                regions.map(region => (
                                    <Link
                                        key={region._id}
                                        to={`/regions/${region._id}`}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        {region.name}
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
