import Link from "next/link"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from "react";

export default function Navbar() {
    const nav = useRef()

    const showNavbar = () => {
        nav.current.style.right = 0
    }

    const closeNavbar = () => {
        nav.current.style.right = "-100dvw"
    }

    return (
        <nav className="navbar">
            <Link className="logo" href="/">
                KINOKASSA
            </Link>

            <div className="navlinks">
                <Link href="/">
                    Главная
                </Link>

                <Link href="/premieres">
                    Премьеры
                </Link>

                <Link href="/cinemas">
                    Кинотеатры
                </Link>
            </div>

            <div className="menu-bar">
                <FontAwesomeIcon onClick={showNavbar} icon={faBars} size='xl' />
            </div>

            <Link href="" className="actionBtn">
                Купить билет
            </Link>

            <div ref={nav} className="navlinks-mob">
                <FontAwesomeIcon onClick={closeNavbar} className="close-btn" icon={faClose} size="xl" />

                <Link href="/">
                    Главная
                </Link>

                <Link href="/premieres">
                    Премьеры
                </Link>

                <Link href="/cinemas">
                    Кинотеатры
                </Link>
            </div>
        </nav>
    )
}