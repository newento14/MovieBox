import {FC, useEffect, useState} from 'react'
import {Button} from '@/components/generetic'
import {IFilm} from '@/types/film'
import {addFavourite, deleteFavourite, inFavourites} from '@/services/favouritesService'
import ratingService from '@/services/ratingsService'
import s from './single-film-screen.module.scss'

interface ButtonsProps {
  film: IFilm
  onOpenRating: () => void
}

export const Buttons: FC<ButtonsProps> = ({film, onOpenRating}) => {
  const [inFav, setInFav] = useState(false)

  const onClickFav = () => {
    if (inFav) deleteFavourite(film.id)
    else addFavourite(film)
    setInFav(f => !f)
  }

  useEffect(() => {
    setInFav(inFavourites(film.id))
  }, [film.id])

  return (
    <div className={s.buttons}>
      {film.type === 'movie' && (
        <Button
          type='primary'
          icon={<i className='ph-play-fill'/>}
        >
          Watch movie
        </Button>
      )}
      {!!film.trailers?.length && (
        <Button
          type='default'
          title='Watch trailer'
        >
          Trailer
        </Button>
      )}
      <Button
        type='default'
        size='large'
        title={inFav ? 'Delete from favourites' : 'Add to favourites'}
        icon={<i className={inFav ? 'ph-bookmark-simple-fill' : 'ph-bookmark-simple'}/>}
        onClick={onClickFav}
      />
      <Button
        type='default'
        size='large'
        icon={<i className={ratingService.inRatings(film.id) ? 'ph-star-fill' : 'ph-star'}/>}
        onClick={onOpenRating}
      />
    </div>
  )
}