import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, useTypedSelector} from "@/redux/store";
import {logIn} from "@/redux/reducers/authSlice";
import Typography from "@mui/material/Typography";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const dispatch= useDispatch<AppDispatch>();
    const isAuth = useTypedSelector(x => x.auth.value.isAuth);

    return (
        <>
            <Typography className="text-3xl font-semibold mt-11">HOME PAGE</Typography>
        </>
    )
}
