import React, {useState} from 'react';
import TransitionsModal from "@/UI/modal/modal";
import {FilmSearchApi} from "@/types/searchApiResponse";
import Button from "@mui/material/Button";
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import favouriteIcon from '../assets/favourite.png';
import favouriteBorderIcon from '../assets/favouriteBorder.png';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import {LogFilm, LogFilmForm} from '@/types/films';
import filmService from "@/services/filmService";

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


const LogFilmModal = ({visible, setVisible, film}: LogFilmModalProps) => {
    const [form, setForm] = useState<LogFilmForm>(defaultFrom);

    function HandleLogButton() {
        const request: LogFilm = {...form, filmName: film["#TITLE"], filmPicture: film["#IMG_POSTER"], filmYear: film["#YEAR"]};

        filmService.logFilm(request);
        setVisible(false);
        setForm(defaultFrom);
    }

    return (
        <TransitionsModal visible={visible} setVisible={setVisible}>
            <>
                <Typography className="text-2xl font-semibold">{film["#AKA"]}</Typography>
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
                <Button onClick={HandleLogButton}>Log</Button>
            </>
        </TransitionsModal>
    );
};

export default LogFilmModal;
