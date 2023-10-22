import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "@/types/user";
import {state} from "sucrase/dist/types/parser/traverser/base";

type AuthState = {
    isAuth: boolean,
    user: IUser,
    isLoading: boolean,
}

type InitialState = {
    value: AuthState,
}

const initialState = {
    value: {
        isAuth: false,
        user: {id: -1, username: "", avatar: ""},
        isLoading: false,
    } as AuthState
} as InitialState;

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<IUser>) => {
            return {
                value: {
                    ...state.value,
                    isAuth: true,
                    user: action.payload,
                }
            }
        },
        setIsLoading: (state, action:PayloadAction<boolean>) => {
            return {
                value: {
                    ...state.value,
                    isLoading: action.payload,
                }
            }
        }
    }
});

export const {logIn, logOut, setIsLoading} = auth.actions;
export default auth.reducer;