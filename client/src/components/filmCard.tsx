import React from 'react';
import {LogFilm} from "@/types/films";
import Skeleton from "@mui/material/Skeleton";
import favouriteIcon from "@/assets/favourite.png";
import favouriteBorderIcon from "@/assets/favouriteBorder.png";
import {Icon} from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

interface FilmCardProps {
    film: LogFilm,
}

const FilmCard = ({film}: FilmCardProps) => {
    return (
        <div className="flex items-center flex-col justify-end">
            <div className="relative">
                {film.filmPicture !== undefined
                    ? <img className="w-96" src={film.filmPicture}
                           alt={`${film.filmName} poster`}/>
                    : <Skeleton variant="rounded" width={224} height={332}/>
                }
                <div
                    className="bg-gradient-to-t from-gray-700 opacity-0 hover:opacity-100 absolute flex flex-col justify-end items-center bottom-0 h-full w-full">
                    <Typography className="text-1xl font-semibold text-white mb-1">{film.filmName},
                        ({film.filmYear})</Typography>
                </div>
            </div>
            <div className="flex items-center justify-center gap-x-2">
                <Icon><img src={film.favourite ? favouriteIcon.src : favouriteBorderIcon.src}
                           className="w-6 p-0 m-0"
                           alt="favourite"/> </Icon>
                <Rating name="half-rating" defaultValue={film.rating} precision={0.5} disabled={true}/>
            </div>
        </div>
    );
};

export default FilmCard;