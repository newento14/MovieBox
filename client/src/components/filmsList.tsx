import {FilmSearchApi} from "@/types/searchApiResponse";
import FilmElement from "@/components/filmElement";

type FilmListProps = {
    films: FilmSearchApi[]
}

const FilmList = ({films}: FilmListProps) => {
    return (
        <>
            {films.map(x => (
                <FilmElement film={x} key={x["#AKA"]}/>
            ))}

        </>
    );
};

export default FilmList;