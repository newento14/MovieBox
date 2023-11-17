import {FC} from 'react'
import styles from './home.module.scss'
import Carousel from "@/components/Carousel/Carousel";
import HeroCarousel from "@/components/HeroCarousel/HeroCarousel";

export const Home: FC = () => {
  return (
    <div className={styles.home}>
      <HeroCarousel
        queryParams={{
          _limit: 6,
          _sort: 'year',
          _order: 'desc'
        }}/>
      <Carousel
        title='Popular'
        queryParams={{
          _limit: 12,
          _sort: 'rating.views',
          _order: 'desc'
        }}
      />

      <Carousel
        title='Recommended'
        queryParams={{
          _limit: 12,
          _sort: 'rating.count',
          _order: 'desc'
        }}
      />
    </div>
  )
}