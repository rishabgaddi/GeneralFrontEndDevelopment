import { useState } from "react";

import { register } from "../services/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    email_confirm: "",
    password: "",
    password_confirm: "",
  });

  const onChangeForm = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmtHandler = async (event) => {
    event.preventDefault();
    const res = await register(formData);
  };

  return (
    <div>
      <h1 className="title">Create your account</h1>
      <form onSubmit={onSubmtHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
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
          <label htmlFor="password_confirm">Password</label>
          <input
            type="password"
            name="password_confirm"
            placeholder="Re-enter the password"
            value={formData.password_conf}
            onChange={onChangeForm}
          />
        </div>

        <div>
          <input type="submit" value="Submit" name="submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
