import styles from '@/styles/Footer.module.css'
import Link from 'next/link'

export default function Footer() {
    const sections = [
        {
            name: 'KINOKASSA',
            subsections: [
                {
                    name: 'Главная',
                    href: '/'
                },
                {
                    name: 'Премьеры',
                    href: '/premieres'
                },
                {
                    name: 'Кинотеатры',
                    href: '/cinemas'
                },
            ]
        },
        {
            name: 'Следите за нами',
            subsections: [
                {
                    name: 'Telegram',
                    href: '/'
                },
                {
                    name: 'Instagram',
                    href: '/'
                },
            ]
        },
        {
            name: 'Другое',
            subsections: [
                {
                    name: 'Политика конфеденциальности',
                    href: '/'
                },
                {
                    name: 'Для кинотеатров',
                    href: '/'
                },
                {
                    name: 'Реклама',
                    href: '/'
                },
            ]
        },
    ]

    const footerSection = (data) => {
        const subsections = data.subsections

        return (
            <section className={styles.section}>
                <div className={styles.sectionName}>
                    {data.name}
                </div>

                <ul>
                    {
                        subsections.map((subsection) => (
                            <li>
                                <Link href={subsection.href}>
                                    {subsection.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>
        )
    }

    return (
        <section className={styles.footer}>
            <section className={styles.sections}>
                {
                    sections.map(section => footerSection(section))
                }
            </section>

            <hr />
            <section className={styles.copyright}>
                
                <div>
                    © 2023 — 2023, KINOKASSA
                </div>

                <div className={styles.onegate}>
                    Проект компании <span>ONEGATE</span>
                </div>
                
            </section>
        </section>
    )
}