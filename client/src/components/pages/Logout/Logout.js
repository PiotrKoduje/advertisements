import { useEffect } from "react";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/users.Redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'POST'
    }
  
    fetch(`${API_URL}/auth/logout`, options)
    .then(() => {
      dispatch(logOut());
      navigate('/');
    });
  }, [dispatch]);

  return null;
};

export default Logout;