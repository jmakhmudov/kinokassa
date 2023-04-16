import Link from "next/link"

export default function Navbar() {

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

            <Link href="" className="actionBtn">
                Купить билет
            </Link>
        </nav>
    )
}