import type {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import ProfileTabs from "@/UI/tabs/tabs";
import {url} from '@/http';
import axios from "axios";
import {LogFilm, LogFilmForm, WatchListFilm} from "@/types/films";
import {IUser} from "@/types/user";
import TransitionsModal from "@/UI/modal/modal";
import favouriteIcon from "@/assets/favourite.png";
import favouriteBorderIcon from "@/assets/favouriteBorder.png";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import {useTypedSelector} from "@/redux/store";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import WatchListCard from "@/components/WatchListCard";
import {FilmSearchApi} from "@/types/searchApiResponse";
import filmService from "@/services/filmService";

type Repo = {
    user: IUser,
    filmCount: number,
    films: WatchListFilm[],
}

export const getServerSideProps = (async (context) => {
    try {
        // @ts-ignore
        const response = await axios.get<Repo>(url + `/user/watchlist/?userName=${context.params.id}`);
        console.log(response.data);
        return {props: {repo: response.data}};
    } catch (e) {
        console.log(e);
        return {props: {repo: {user: {username: "fail", id: -1, avatar: ""}, filmCount: 0, films: []}}}
    }
}) satisfies GetServerSideProps<{
    repo: Repo
}>

interface LogFilmModalProps {
    visible: boolean,
    setVisible: (x: boolean) => void,
    film: FilmSearchApi
}

const defaultFrom: LogFilmForm = {
    rating: 5,
    favourite: false,
    comment: "",
}

export default function Watchlist({repo}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const route = useRouter();
    const userName = useTypedSelector(x => x.auth.value.user.username)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState<WatchListFilm>({});

    const [form, setForm] = useState<LogFilmForm>(defaultFrom);

    if (repo.user.id === -1) {
        return (
            <div>
                <Typography className="text-4xl font-semibold">404: NOT FOUND</Typography>
            </div>
        );
    }

    function HandleFilmModal(film: WatchListFilm) {
        if (route.query.id !== userName)
            return;

        setSelectedFilm(film);
        setModalVisible(true);
    }

    function HandleLogButton() {
        const request: LogFilm = {...form, filmName: selectedFilm.name, filmPicture: selectedFilm.picture, filmYear: selectedFilm.year};

        filmService.logFilm(request);
        filmService.deleteFromWatchList(selectedFilm);
        setModalVisible(false);
        setForm(defaultFrom);
    }

    function HandleDeleteButton() {
        console.log(selectedFilm);
        filmService.deleteFromWatchList(selectedFilm);
    }

    return (
        <div className="w-auto">
            <div className="flex flex-row items-end gap-x-6">
                <Avatar alt="profilePicture" src={repo.user.avatar} sx={{width: 102, height: 102}}/>
                <div>
                    <Typography className="text-2xl font-semibold">{repo.user.username}</Typography>
                    <Typography className="text-2xl">Film watched: {repo.filmCount}</Typography>
                </div>
            </div>
            <div className="mt-6 flex justify-center w-auto border-2">
                <ProfileTabs value={2} username={route.query.id}/>
            </div>
            <div className="mt-6"></div>
            <div className="grid 2xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 gap-4">
                {repo.films.map(x => (
                    <div className="flex justify-end" onClick={() => HandleFilmModal(x)}>
                        <WatchListCard film={x}/>
                    </div>
                ))}
                <TransitionsModal visible={modalVisible} setVisible={setModalVisible}>
                    <div>
                        <TransitionsModal visible={modalVisible} setVisible={setModalVisible}>
                            <>
                                <Typography className="text-2xl font-semibold">{selectedFilm.name},
                                    ({selectedFilm.year})</Typography>
                                <div className="flex items-center gap-x-4">
                                    <IconButton><img src={form.favourite ? favouriteIcon.src : favouriteBorderIcon.src}
                                                     onClick={() => setForm({...form, favourite: !form.favourite})}
                                                     className="w-6 p-0 m-0"
                                                     alt="favourite"/> </IconButton>
                                    <Rating name="half-rating" defaultValue={0} value={form.rating}
                                        // @ts-ignore
                                            onChange={(e, value) => setForm({...form, rating: value})} precision={0.5}/>
                                </div>
                                <div className="w-full">
                                    <TextField
                                        fullWidth
                                        value={form.comment}
                                        onChange={(e) => setForm({...form, comment: e.target.value})}
                                        label="Comment"
                                        multiline
                                        maxRows={4}
                                    />
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <Button className="bg-green-400 hover:bg-green-200 mr-5 text-black"
                                            onClick={HandleLogButton}>Log</Button>
                                    <Button className="bg-red-400 hover:bg-red-200 text-black"
                                            onClick={HandleDeleteButton}>Delete</Button>
                                </div>
                            </>
                        </TransitionsModal>
                    </div>
                </TransitionsModal>
            </div>
        </div>
    )
}