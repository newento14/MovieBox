import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider, useDispatch} from "react-redux";
import {AppDispatch, store, useTypedSelector} from "@/redux/store";
import Navbar from "@/components/Navbar";
import Auth from "@/components/Auth";

export default function AppWrapper({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Auth>
                <>
                    <Navbar />
                    <main className="w-full h-auto mt-8 flex justify-center items-center">
                        <div className="2xl:pr-96 2xl:pl-96 w-full ml-auto mr-auto md:pr-24 md:pl-24 pl-2 pr-2">
                            <Component {...pageProps} />
                        </div>
                    </main>
                </>
            </Auth>
        </Provider>
    )
}