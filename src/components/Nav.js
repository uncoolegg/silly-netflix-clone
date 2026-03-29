import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'

function Nav() {
    const [show, navbarVisibile] = useState(false);
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                navbarVisibile(true);
            } else navbarVisibile(false);
        });
        return () => {
            window.removeEventListener("scroll", () => {})
        }
    }, [])

    return (
    <div className={`nav ${show && "nav_blur"}`}>
        <img
        className="nav_logo"
        alt="site logo"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/OnlyFans_logo.svg"
        onClick={goHome}
        />
    </div>
  )
}

export default Nav