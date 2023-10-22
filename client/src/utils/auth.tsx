import {useDispatch} from "react-redux";
import {useEffect} from "react";
import authService from "@/services/authService";

// const Auth = () => {
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         if(localStorage.getItem('token')) {
//             (authService.auth())(dispatch);
//         }
//     }, []);
//
//     return (
//         <>
//         </>
//     );
// };
//
// export default Auth;