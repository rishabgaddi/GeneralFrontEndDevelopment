import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    email: "",
    message: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <h1 className="title">Contact form</h1>
      <form>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter your email address"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            placeholder="Enter your message"
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <div>
          <input type="submit" name="send" value="Send contact" />
        </div>
      </form>
    </div>
  );
};

export default Contact;
