import styles from '@/styles/Section.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Section({ title, data, cinemas }) {
    const router = useRouter()

    const handleClick = (id, cinema) => {
        cinema ? router.push(`/cinemas/${id}`) :router.push(`/premieres/${id}`)
    }

    return (
        <section className={styles.sectionBox}>
            <div className={styles.sectionName}>
                {title}
            </div>

            <section className={styles.cardList}>
                {
                    data.map((card) => {
                        return (
                            cinemas ?
                                <div onClick={() => handleClick(card.id, true)} key={card.id} className={styles.cardBox}>
                                    <div className={styles.cardImg}>
                                        <Image src={card.logo_url} layout='fill' />
                                    </div>

                                    <section className={styles.cardInfo}>
                                        <div className={styles.cardName}>
                                            {card.name}
                                        </div>
                                    </section>
                                </div>
                                :
                                <div key={card.id} onClick={() => handleClick(card.id, false)} className={styles.cardBox}>
                                    <div className={styles.cardImg}>
                                        <Image src={card.posters.previewUrl} layout='fill' />
                                    </div>

                                    <section className={styles.cardInfo}>
                                        <div className={styles.cardName}>
                                            {card.name}
                                        </div>

                                        <div className={styles.cardDescription}>
                                            {card.year} | {card.movieLength} мин
                                        </div>
                                    </section>
                                </div>
                        )
                    })
                }
            </section>
        </section>
    )
}