export interface LogFilmForm {
    rating: number,
    favourite: boolean,
    comment: string,
}

export interface LogFilm {
    id?: number,
    rating?: number,
    favourite?: boolean,
    comment?: string,
    filmName?: string,
    filmPicture?: string,
    filmYear?: number,
}

export interface WatchListFilm {
    id?: number,
    name?: string,
    picture?: string,
    year?: number,
}