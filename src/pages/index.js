import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { supabase } from '@/supabase'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Carousel } from 'flowbite-react'
import { useRouter } from 'next/router'
import Section from '@/components/Section'
import Footer from '@/components/Footer'

export default function Home({ movieData, cinemas }) {
  const router = useRouter()

  const handleClick = (movie) => {
    router.push({
      pathname: `/premieres/${movie.id}`,
      query: { data: JSON.stringify(movie) }
    }, `/premieres/${movie.id}`)
  }

  return (
    <>
      <Head>
        <title>KINOKASSA. Билеты в кино стали намного ближе</title>
        <meta name="description" content="Онлайн покупка билетов в кино, Ташкент" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />

        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 main-carousel">
          <Carousel
            leftControl=" "
            rightControl=" "
            slide={true}
            slideInterval={5000}
          >
            {
              movieData.map(movie => {
                return (
                  <div key={movie.id} onClick={() => handleClick(movie)}>
                    <div className={styles.carouselCard}>
                      <img src={movie.mainPreview} alt={movie.name} />

                      <div className={styles.shadowOverlay}></div>

                      <div className={styles.carouselInfo}>
                        <div>{movie.name}</div>
                        <p>{movie.year} | {movie.nameOriginal}</p>
                        <Link className='actionBtn' key={movie.id}
                          href={{
                            pathname: `/showtimes/${movie.id}`,
                            query: { data: JSON.stringify(movie) }
                          }}>
                          Ближайшие сеансы
                        </Link>
                      </div>

                    </div>
                  </div>
                )
              })
            }
          </Carousel>
        </div>

        <Section title="Кинотеатры" data={cinemas} cinemas={true} />
        <Section title="Премьеры" data={movieData} cinemas={false} />

        <Footer />
      </main>
    </>
  )
}


async function getMovies() {
  let { data: movies, error } = await supabase
    .from('movies')
    .select('*')
  if (error) console.log(error)

  return movies
}

async function getCinemas() {
  let { data: cinemas, error } = await supabase
    .from('cinemas')
    .select('*')
  if (error) console.log(error)

  return cinemas
}

export async function getServerSideProps() {
  const movieData = []
  const movies = await getMovies()
  const cinemas = await getCinemas()

  const promises = movies.map((movie) => {
    return fetch(`https://api.kinopoisk.dev/v1/movie/${movie.kinopoisk_id}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.KINOPOISK_TOKEN,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        const movieInfo = {
          id: movie.id,
          name: json.name,
          nameOriginal: json.alternativeName,
          description: json.description,
          posters: json.poster,
          genres: json.genres,
          trailers: json.videos.trailers,
          movieLength: json.movieLength,
          rating: json.rating.imdb,
          year: json.year,
          mainPreview: movie.preview_url
        }
        movieData.push(movieInfo)
      })
      .catch(err => console.log(err))
  })

  await Promise.all(promises)

  return { props: { movieData, cinemas } }
}

