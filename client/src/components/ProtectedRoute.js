import React, { useEffect } from "react";
import { GetCurrentUser } from "../api/users";
import { SetUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getValidUser = async () => {
        try {
            dispatch(ShowLoading()); // loading => true 
            const response = await GetCurrentUser();
            console.log(response);
            dispatch(SetUser(response.data));
            dispatch(HideLoading());
        }
        catch (error) {
            console.log(error);
            dispatch(HideLoading()); // loading => false
            localStorage.removeItem("token");
            navigate("/login");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            getValidUser();
        }
        else{
            navigate("/login");
        }
    }, []);

    return  (
        <div>
            {children}
        </div>
    );
}

export default ProtectedRoute;