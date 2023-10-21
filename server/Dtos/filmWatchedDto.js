module.exports = class watchListDto {
    id;
    rating;
    name;
    picture;
    year;

    constructor(film) {
        this.id = film.id;
        this.rating = film.rating;
        this.name = film.filmName;
        this.picture = film.filmPicture;
        this.year = film.filmYear;
    }
}