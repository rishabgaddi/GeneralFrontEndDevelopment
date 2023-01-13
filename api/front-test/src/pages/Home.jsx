import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Chucknorris from "../components/Chucknorris";
import { getMe } from "../services/auth";

const Home = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Home";
    const getData = async () => {
      if (user) {
        const res = await getMe(token);
        setEmail(res.data.email);
      }
    };

    getData();
  }, [user]);

  return (
    <div>
      Home {email} <Chucknorris />
    </div>
  );
};

export default Home;
