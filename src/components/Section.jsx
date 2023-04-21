import styles from '@/styles/Section.module.css'
import Image from 'next/image'

export default function Section({ title, data, cinemas }) {


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
                                <div key={card.id} className={styles.cardBox}>
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
                                <div key={card.id} className={styles.cardBox}>
                                    <div className={styles.cardImg}>
                                        <Image src={card.preview} layout='fill' />
                                    </div>

                                    <section className={styles.cardInfo}>
                                        <div className={styles.cardName}>
                                            {card.nameRu}
                                        </div>

                                        <div className={styles.cardDescription}>
                                            {card.year} | {card.filmLength} мин
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