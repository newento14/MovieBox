import type {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import ProfileTabs from "@/UI/tabs/tabs";
import {url} from '@/http';
import axios from "axios";
import {LogFilm} from "@/types/films";
import {IUser} from "@/types/user";
import FilmCard from "@/components/filmCard";

type Repo = {
    user: IUser,
    filmCount: number,
    lastFilms: LogFilm[]
}

export const getServerSideProps = (async (context) => {
    try {
        // @ts-ignore
        const response = await axios.get<Repo>(url + `/user?userName=${context.params.id}`);
        return {props: {repo: response.data}};
    } catch (e) {
        console.log(e);
        return {props: {repo: {filmCount: 0, user: {username: "fail", id: -1, avatar: ""}, lastFilms: []}}}
    }
}) satisfies GetServerSideProps<{
    repo: Repo
}>

export default function Profile({repo}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const route = useRouter();

    if(repo.user.id === -1) {
        return (
            <div>
                <Typography className="text-4xl font-semibold">404: NOT FOUND</Typography>
            </div>
        );
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
                <ProfileTabs value={0} username={route.query.id}/>
            </div>
            <Typography className="mt-6">RECENT ACTIVITY</Typography>
            <div className="flex justify-between gap-x-2">
                {repo.lastFilms.map(x => (
                    <FilmCard film={x} />
                ))}
            </div>
        </div>
    )
}