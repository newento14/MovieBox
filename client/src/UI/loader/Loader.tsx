import cl from './loader.module.css'

const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className={cl.loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    );
};

export default Loader;