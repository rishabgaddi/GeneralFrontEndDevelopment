import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    email_confirm: "",
    password: "",
    password_confirm: "",
  });
  const [msg, setMsg] = useState(null);

  const onChangeForm = (event) => {
    setMsg(null);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmtHandler = async (event) => {
    event.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setMsg("Email or password is empty");
      return;
    }

    if (
      formData.email !== formData.email_confirm ||
      formData.password !== formData.password_confirm
    ) {
      setMsg("Emails or passwords do not match");
      return;
    }

    const res = await register(formData);
    if (res.status === 200) {
      navigate("/");
    } else {
      setMsg(res.response.data.message);
      setFormData({
        email: "",
        email_confirm: "",
        password: "",
        password_confirm: "",
      });
    }
  };

  return (
    <div>
      <h1 className="title">Create your account</h1>
      <form onSubmit={onSubmtHandler}>
        {msg && <div className="msg msg-error">{msg}</div>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <label htmlFor="email_confirm">Confirm email</label>
          <input
            type="email"
            name="email_confirm"
            placeholder="Re-enter your email"
            value={formData.email_conf}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter the password"
            value={formData.password}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <label htmlFor="password_confirm">Confirm password</label>
          <input
            type="password"
            name="password_confirm"
            placeholder="Re-enter the password"
            value={formData.password_conf}
            onChange={onChangeForm}
          />
        </div>

        <div>
          <input type="submit" value="Create" name="send" />
        </div>
      </form>
    </div>
  );
};

export default Register;
