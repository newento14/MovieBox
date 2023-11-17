import {IFilm} from "@/types/film";
import styles from './styles.module.scss';
import {Link} from "react-router-dom";
import {RouteNames} from "@/router";
import {Title} from "@/components/generetic";

interface HeroFilmBlockProps {
  film: IFilm
}

const filmTypes = {
  'series': 'Serial',
  'movie': 'Movie'
}

const HeroFilmBlock = ({film}: HeroFilmBlockProps) => {
  return (
    <div className={styles.item}>
      <Link to={`${RouteNames.FILM}/${film.slug}`} className={styles.link} />
      <div className={styles.content}>

      </div>
      <img src={`/assets/${film.preview}`} className={styles.image} alt={film.name} loading='lazy' />
    </div>

  );
};

export default HeroFilmBlock;