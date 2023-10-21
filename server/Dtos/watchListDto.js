module.exports = class watchListDto {
    id;
    name;
    picture;
    year;

    constructor(film) {
        this.id = film.id;
        this.name = film.filmName;
        this.picture = film.filmPicture;
        this.year = film.filmYear;
    }
}