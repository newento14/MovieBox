import {Swiper, SwiperSlide} from 'swiper/react';
import {SwiperOptions} from 'swiper/types/swiper-options';
import {useQuery} from "react-query";
import filmService from "@/services/filmService";
import {Film} from '../Film/Film';
import {FreeMode} from "swiper/modules";
import 'swiper/css';
import clsx from "clsx";
import styles from './styles.module.scss';
import {Title} from "@/components/generetic";


interface CarouselProps {
  title: string
  queryParams?: {
    [key: string]: string | number
  }
}

const Carousel = ({title, queryParams}: CarouselProps) => {
  const swiperOptions: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 12,
    breakpoints: {
      769: {
        spaceBetween: 15,
      },
      1401: {
        spaceBetween: 18,
      },
    },
  };

  const {data = [], isLoading} = useQuery(`get films ${title}`, () => filmService.getFilms(queryParams), {
    select: resp => resp.data,
    refetchOnMount: false
  })

  return (
    <div>
      <Title level='h2'>{title}</Title>
      <Swiper
        className={clsx(styles.slider)}
        navigation={true}
        modules={[FreeMode]}
        freeMode={{momentumBounceRatio: 0}}
        {...swiperOptions}
      >
        {data.map(film => (
          <SwiperSlide key={film.id} className={styles.slide}>
            <Film film={film}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;