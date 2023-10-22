import {AuthResponse, ILogin, IRegistration} from "@/types/user";
import {AppDispatch} from "@/redux/store";
import {logIn, logOut, setIsLoading} from '@/redux/reducers/authSlice'
import $api, {url} from "@/http";
import axios from "axios";

export default class authService {
    static login(form:ILogin): (dispatch:AppDispatch) => void {
        return async (dispatch:AppDispatch) => {
            try {
                const response = await $api.post<AuthResponse>('/user/login', {
                    email: form.email,
                    password: form.password
                });
                console.log(response);
                localStorage.setItem('token', response.data.accessToken);
                dispatch(logIn(response.data.user));

            } catch (e: any) {
                console.log(e.response?.data?.message);
            }
        }
    }

    static registration(form:IRegistration): (dispatch:AppDispatch) => void {
        return async (dispatch:AppDispatch) => {
            try {
                console.log(form);
                const response = await $api.post<AuthResponse>('/user/registration', {
                    username: form.username, email:form.email, password:form.password
                });
                console.log(response);
                //localStorage.setItem('token', response.data.accessToken);

            } catch (e: any) {
                console.log(e.response?.data?.message);
            }
        }
    }

    static logout(): (dispatch:AppDispatch) => void{
        return async (dispatch:AppDispatch) => {
            try {
                const response = await $api.post('/user/logout');
                console.log(response);
                localStorage.removeItem('token');
                dispatch(logOut());

            } catch (e: any) {
                console.log(e.response?.data?.message);
            }
        }
    }

    static auth() {
        return async (dispatch:AppDispatch) => {
            dispatch(setIsLoading(true));
            try {
                const response = await axios.get<AuthResponse>(`${url}/user/refresh`, {withCredentials: true});
                console.log(response);
                localStorage.setItem('token', response.data.accessToken);
                dispatch(logIn(response.data.user));

            } catch (e: any) {
                console.log(e.response?.data?.message);
            } finally {
                dispatch(setIsLoading(false));
            }
        }
    }
}