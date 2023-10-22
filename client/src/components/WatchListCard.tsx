import React from 'react';
import {WatchListFilm} from "@/types/films";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface FilmCardProps {
    film: WatchListFilm,
}

const WatchListCard = ({film}: FilmCardProps) => {
    return (
        <div className="flex items-center flex-col justify-end">
            <div className="relative">
                {film.picture !== undefined
                    ? <img className="w-96" src={film.picture}
                           alt={`${film.name} poster`}/>
                    : <Skeleton variant="rounded" width={224} height={332}/>
                }
                <div
                    className="bg-gradient-to-t from-gray-700 opacity-0 hover:opacity-100 absolute flex flex-col justify-end items-center bottom-0 h-full w-full">
                    <Typography className="text-1xl font-semibold text-white mb-1">{film.name},
                        ({film.year})</Typography>
                </div>
            </div>
        </div>
    );
};

export default WatchListCard;