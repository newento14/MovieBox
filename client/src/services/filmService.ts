import axios from 'axios';
import {FilmSearchApi, SearchFilmResponse} from "@/types/searchApiResponse";
import {LogFilmForm, LogFilm, WatchListFilm} from "@/types/films";
import $api from "@/http";

const SEARCH_API_URL: string = "https://imdb-search2.p.rapidapi.com/";

export default class filmService {
    static async searchFilms(searchQuery: string) {
        try {
            const responce = await axios.get<SearchFilmResponse>(SEARCH_API_URL + searchQuery, {
                headers: {

                }
            });
            return responce.data.description;
        } catch (e) {
            console.log(e);
        }
    }

    static async logFilm(form: LogFilm) {
        try {
            const response = await $api.post('films/', form);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    static async updateFilm(film:LogFilm) {
        try {
            const response = await $api.put("films/", film);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    static async deleteFilm(film:LogFilm) {
        try {
            const response = $api.delete(`films/?id=${film.id}`);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }


    static async addToWatchList(film:FilmSearchApi) {
        try {
            const response = await $api.post('watchList/', {filmName: film["#TITLE"], filmPicture: film["#IMG_POSTER"], filmYear: film["#YEAR"]});
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    static async deleteFromWatchList(film:WatchListFilm) {
        try {
            const response = await $api.delete(`watchlist/?id=${film.id}`);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }
}