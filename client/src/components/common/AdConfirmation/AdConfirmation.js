import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      switch (type) {
        case "newUser":
          navigate("/login");
          break;
        // case "edit":
        //   navigate(-2);
        //   break;
        case "edit":
        case "add":
        case "delete":
        default:
          navigate("/");
      }
       
    }, 2000);
    return () => clearTimeout(timer); 
  }, [dispatch, navigate, type]);

return(
  <>
    { type === 'add' &&<h1 className="text-center text-success fw-bold">Ad successfully added</h1> }
    { type === 'delete' &&<h1 className="text-center text-success fw-bold">Ad successfully deleted</h1> }
    { type === 'edit' &&<h1 className="text-center text-success fw-bold">Ad successfully updated</h1> }
    { type === 'newUser' &&<h1 className="text-center text-success fw-bold">New user created</h1> }
  </>
)
};

export default AdConfirmation;