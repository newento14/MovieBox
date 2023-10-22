import React, {ReactNode, useEffect} from 'react';
import {useDispatch} from "react-redux";
import authService from "@/services/authService";
import {useTypedSelector} from "@/redux/store";
import Modal from "@mui/material/Modal";
import TransitionsModal from "@/UI/modal/modal";
import Loader from "@/UI/loader/Loader";

type AuthProps = {
    children: JSX.Element
}

const Auth = ({children}: AuthProps) => {
    const dispatch = useDispatch();
    //const isLoading = useTypedSelector(x => x.auth.value.isLoading)


    useEffect(() => {
        if(localStorage.getItem('token')) {
            (authService.auth())(dispatch);
        }
    }, []);



    return (
        <div>
            {/*{isLoading ? <TransitionsModal visible={isLoading}><Loader/></TransitionsModal> : children}*/}
            {children}
        </div>
    );
};

export default Auth;