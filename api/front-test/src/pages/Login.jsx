import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../services/auth";
import { setAuth } from "../slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState(null);

  const onChangeForm = (event) => {
    setMsg(null);
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmtHandler = async (event) => {
    event.preventDefault();

    if (form.email === "" || form.password === "") {
      setMsg("Email or password is empty");
      return;
    }

    const res = await login(form);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      dispatch(setAuth(res.data));
      navigate("/");
    } else {
      setMsg(res.response.data.msg);
    }
  };

  return (
    <div>
      <h1 className="title">Login to your account</h1>
      <form onSubmit={onSubmtHandler}>
        {msg && <div className="msg msg-error">{msg}</div>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter the password"
            value={form.password}
            onChange={onChangeForm}
          />
        </div>

        <div>
          <input type="submit" value="Login" name="send" />
        </div>
      </form>
    </div>
  );
};

export default Login;
