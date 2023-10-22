import type {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import ProfileTabs from "@/UI/tabs/tabs";
import {url} from '@/http';
import axios from "axios";
import {LogFilm} from "@/types/films";
import {IUser} from "@/types/user";
import FilmCard from "@/components/filmCard";
import TransitionsModal from "@/UI/modal/modal";
import favouriteIcon from "@/assets/favourite.png";
import favouriteBorderIcon from "@/assets/favouriteBorder.png";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import {useTypedSelector} from "@/redux/store";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import filmService from "@/services/filmService";

type Repo = {
    user: IUser,
    filmCount: number,
    films: LogFilm[],
}

export const getServerSideProps = (async (context) => {
    try {
        // @ts-ignore
        const response = await axios.get<Repo>(url + `/user/films/?userName=${context.params.id}`);
        return {props: {repo: response.data}};
    } catch (e) {
        console.log(e);
        return {props: {repo: {user: {username: "fail", id: -1, avatar: ""}, filmCount: 0, films: []}}}
    }
}) satisfies GetServerSideProps<{
    repo: Repo
}>

export default function FIlms({repo}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const route = useRouter();
    const userName = useTypedSelector(x => x.auth.value.user.username)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState<LogFilm>({});
    const [newData, setNewData] = useState<LogFilm>({});


    if (repo.user.id === -1) {
        return (
            <div>
                <Typography className="text-4xl font-semibold">404: NOT FOUND</Typography>
            </div>
        );
    }

    function HandleFilmModal(film: LogFilm) {
        if (route.query.id !== userName)
            return;

        setNewData(film);
        setSelectedFilm(film);
        setModalVisible(true);
    }

    function DeleteFilm() {
        filmService.deleteFilm(newData);
    }

    function UpdateFilm() {
        filmService.updateFilm(newData);
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
                <ProfileTabs value={1} username={route.query.id}/>
            </div>
            <div className="mt-6"></div>
            <div className="grid 2xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 gap-4">
                {repo.films.map(x => (
                    <div className="flex justify-end" onClick={() => HandleFilmModal(x)}>
                        <FilmCard film={x}/>
                    </div>
                ))}
                <TransitionsModal visible={modalVisible} setVisible={setModalVisible}>
                    <div className="m-2 flex-col flex items-center justify-center">
                        <Typography className="text-2xl font-semibold">{selectedFilm.filmName},
                            ({selectedFilm.filmYear})</Typography>
                        <div className="flex-col items-center justify-center gap-x-2 gap-y-3">
                            <div className="flex items-center">
                                <IconButton><img src={newData.favourite ? favouriteIcon.src : favouriteBorderIcon.src}
                                                 onClick={() => setNewData({...newData, favourite: !newData.favourite})}
                                                 className="w-6 p-0 m-0"
                                                 alt="favourite"/> </IconButton>
                                <Rating name="half-rating"
                                    // @ts-ignore
                                        onChange={(e, value) => setNewData({...newData, rating: value})}
                                        defaultValue={selectedFilm.rating}
                                        precision={0.5}/>
                            </div>
                            <div className="w-full mt-2">
                                <TextField
                                    fullWidth
                                    value={newData.comment}
                                    onChange={(e) => setNewData({...newData, comment: e.target.value})}
                                    label="Comment"
                                    multiline
                                    maxRows={4}
                                />
                            </div>
                            <div className="flex justify-between mt-3">
                                <Button className="bg-green-400 hover:bg-green-200 text-gray-500"
                                        onClick={UpdateFilm}>UPDATE</Button>
                                <Button className="bg-red-400 hover:bg-red-200 text-black"
                                        onClick={DeleteFilm}>DELETE</Button>
                            </div>
                        </div>
                    </div>
                </TransitionsModal>
            </div>
        </div>
    )
}