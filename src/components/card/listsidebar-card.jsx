import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListSidebar = ({ icon, title, link, isActive }) => {
    return (
        <Link to={link}>
            <li className={`cursor-pointer -ml-10 border border-solid rounded-r-xl shadow-md flex items-center space-x-4 p-3 transform transition-all duration-300 group
                ${isActive ? 'bg-[#356989] border-white translate-x-0' : 'bg-white border-[#244255] hover:bg-[#356989] hover:border-white hover:translate-x-1'}`}>
                <div className="icon-sb h-10 w-10 bg-white rounded-full flex items-center justify-center p-2">
                    <img
                        src={icon}
                        alt="Icon"
                        className="md:h-8 md:w-8"
                    />
                </div>
                <span className={`md:text-base text-xs font-bold font-sans cursor-pointer
                    ${isActive ? 'text-white' : 'text-[#1E5454] group-hover:text-white'}`}>
                    {title}
                </span>
            </li>
        </Link>
    );
};

ListSidebar.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
};

export default ListSidebar;
