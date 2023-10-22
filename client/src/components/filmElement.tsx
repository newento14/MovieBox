import {FilmSearchApi} from "@/types/searchApiResponse";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useTypedSelector} from "@/redux/store";
import LogFilmModal from "@/components/logFilmModal";
import filmService from "@/services/filmService";

type FilmElementProps = {
    film: FilmSearchApi,
}

const FilmElement = ({film}: FilmElementProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const isAuth = useTypedSelector(x => x.auth.value.isAuth);

    function HandleAddToWatchList() {
        filmService.addToWatchList(film);
    }

    return (
        <div className="w-full h-full flex justify-center">
            <div className="sm:w-max bg-fuchsia-300 rounded-3xl mb-6 flex gap-x-3 items" style={{width: 750}}>
                {film["#IMG_POSTER"] !== undefined
                    ? <img className="w-64 rounded-tl-3xl rounded-bl-3xl" src={film["#IMG_POSTER"]}
                           alt={`${film["#TITLE"]} poster`}/>
                    : <Skeleton variant="rounded" width={256} height={350}/>
                }
                <div className="flex flex-col justify-between mb-5 mt-12">
                    <div>
                        <Typography className="text-3xl font-semibold">{film["#TITLE"]}</Typography>
                        <Typography className="text-2xl">{film["#YEAR"]}</Typography>
                        <div className='mt-3'>
                            <Typography className="text-2xl">Rank: {film["#RANK"]}</Typography>
                            <Typography className="text-2xl">{film["#ACTORS"]}</Typography>
                        </div>
                    </div>
                    {isAuth &&
                        <div className="flex">
                            <Button onClick={() => setModalVisible(true)}>Log</Button>
                            <LogFilmModal visible={modalVisible} setVisible={setModalVisible} film={film}/>
                            <Button onClick={HandleAddToWatchList}>Add to WatchList</Button>
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default FilmElement;