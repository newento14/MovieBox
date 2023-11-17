import {Swiper, SwiperSlide} from 'swiper/react';
import {SwiperOptions} from 'swiper/types/swiper-options';
import {useQuery} from "react-query";
import filmService from "@/services/filmService";
import 'swiper/css';
import clsx from "clsx";
import styles from './styles.module.scss';
import HeroFilmBlock from "@/components/HeroFilmBlock/HeroFilmBlock";

interface CarouselProps {
  queryParams?: {
    [key: string]: string | number
  }
}

const HeroCarousel = ({queryParams}: CarouselProps) => {
  const swiperOptions: SwiperOptions = {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 12,
    centeredSlides: true,
    breakpoints: {
      769: {
        spaceBetween: 15,
      },
      1401: {
        spaceBetween: 18,
      },
    },
  };

  const {data = [], isLoading} = useQuery(`get films`, () => filmService.getFilms(queryParams), {
    select: resp => resp.data,
    refetchOnMount: false
  })

  return (
    <div>
      <Swiper
        className={clsx(styles.slider)}
        {...swiperOptions}
      >
        {data.map(film => (
          <SwiperSlide key={film.id} className={styles.slide}>
            <HeroFilmBlock film={film}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
