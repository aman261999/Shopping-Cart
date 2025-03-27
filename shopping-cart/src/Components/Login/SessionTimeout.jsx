import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/slices/authSlice";

const SessionTimeout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [warningShown, setWarningShown] = useState(false);

    useEffect(() => {
        if (user?.authUser) {
            const checkSession = () => {
                const expiry = sessionStorage.getItem("expiry");
                if (expiry) {
                    const remainingTime = Number(expiry) - Date.now();

                    if (remainingTime <= 10000 && !warningShown) { // Show alert 10s before expiry
                        setWarningShown(true);
                        if (window.confirm("Your session is about to expire. Do you want to continue?")) {
                            const newExpiry = Date.now() + 60 * 60 * 1000;
                            sessionStorage.setItem("expiry", newExpiry);
                            setWarningShown(false); // Reset warning flag
                        } else {
                            dispatch(logout());
                            navigate("/login");
                        }
                    }

                    if (remainingTime <= 0) {
                        dispatch(logout());
                        navigate("/login");
                    }
                }
            };

            const interval = setInterval(checkSession, 1000); // Check every second
            return () => clearInterval(interval);
        }
    }, [user, dispatch, navigate, warningShown]);

    return null;
};

export default SessionTimeout;
