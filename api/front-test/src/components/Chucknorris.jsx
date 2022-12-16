import { useEffect, useState } from "react";

import { getRandomFact } from "../services/chucknorris";

const Chucknorris = () => {
  const [fact, setFact] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setFact(await getRandomFact());
    };
    fetchData();
  }, []);
  return <div className="fact">{fact}</div>;
};

export default Chucknorris;
