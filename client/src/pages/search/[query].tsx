import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import filmService from "@/services/filmService";
import { FilmSearchApi } from "@/types/searchApiResponse";
import FilmsList from "@/components/filmsList";

type Repo = {
    films: FilmSearchApi[] | undefined;
};

export const getServerSideProps: GetServerSideProps<{ repo: Repo }> = async (context) => {
    try {
        const response = await filmService.searchFilms(context.query.query as string);

        const repo: Repo = {films: response};

        return {props: {repo}};
    } catch (error) {
        console.error("Помилка під час запиту до сервісу фільмів", error);
        return {
            notFound: true,
        };
    }
};

const Search: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ repo }) => {
    console.log(repo);
    return (
        <>
            {repo.films ? (
                <FilmsList films={repo.films}/>
            ) : (
                <p>Фільми не знайдені</p>
            )}
        </>
    );
};


export default Search;
