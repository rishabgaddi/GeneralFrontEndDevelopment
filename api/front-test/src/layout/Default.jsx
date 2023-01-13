import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "../services/auth";
import { setAuth } from "../slices/authSlice";

const Default = ({ children, privated = false }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    let token = localStorage.getItem("token");
    const res = await getMe(token);
    if (res.status && res.status === 200) {
      dispatch(
        setAuth({
          user: res.data,
          token: token,
        })
      );
    }
    if (privated && !isAuth) return navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div id="default">
      <nav>
        {isAuth && (
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/animals"}>Animals</Link>
            <Link to={"/contact"}>Contacts</Link>
            <Link to={"/logout"}>Logout</Link>
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
