import { Link } from "react-router-dom";
import logo from "../../../assets/images/rainbow.png";

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2 sm:gap-4 sm:px-0">
            <img className='w-10 h-10' src={logo} alt="logo" />
            <p className="text-lg sm:text-3xl font-bold">Pixels</p>
        </Link>
    )
}

export default Logo