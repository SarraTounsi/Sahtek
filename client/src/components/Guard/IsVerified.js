import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";

const isVerified = (Component) => {
  const AuthGuard = (props) => {
    const user = useSelector(selectUser);
    const token = useSelector((state) => state.user.token);

    if (user.verified == false) {
      // If the user is not logged in, redirect to the login page
      return <Navigate to={`/mail-verification/${user.id}`} />;
    }

    // If the user is logged in, render the component
    return <Component {...props} />;
  };

  return AuthGuard;
};

export default isVerified;
