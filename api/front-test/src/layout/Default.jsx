import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "../services/auth";
import { setAuth } from "../slices/authSlice";

const Default = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const res = await getMe();
    console.log("res", res);
    if (res.status === 503) {
      return navigate("/login");
    }
    dispatch(setAuth(res.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div id="default">
      <nav>
        <Link to={"/"}>Home</Link>
        {isAuth && (
          <>
            <Link to={"/animals"}>Animals</Link>
            <Link to={"/contact"}>Contacts</Link>
          </>
        )}
        {!isAuth && (
          <>
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Login</Link>
          </>
        )}
      </nav>
      <div className="container">{children}</div>
    </div>
  );
};

export default Default;
