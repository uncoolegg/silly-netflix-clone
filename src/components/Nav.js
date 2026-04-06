import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'

function Nav() {
    const [show, navbarVisible] = useState(false);
    const [searchQuery, setQuery] = useState("")
    const [hamburgerVisible, setHamburgerVisible] = useState(false);
    const navigate = useNavigate();

    const initSearch = () => {
        navigate(`/search?query=${searchQuery}`)
    }

    const goHome = () => {
        navigate('/');
    };

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            initSearch()
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                navbarVisible(true);
            } else navbarVisible(false);
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
            src="/eggflix_logo.svg"
            onClick={goHome}
        />
        <input 
            type="text"
            className='search' 
            name='searchQuery'
            placeholder='Search movies, shows...'
            value={searchQuery ?? ''}
            onChange={e => {setQuery(e.target.value)}} 
            onBlur={(e) => {
                let value = e.target.value;
                if (!value) {
                    return;
                }
                initSearch();
            }}
            onKeyDown={keyDownHandler}
        />
        <div className='nav_mobile_menu'></div>
    </div>
  )
}

export default Nav