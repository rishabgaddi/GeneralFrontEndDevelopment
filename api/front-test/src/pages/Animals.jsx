import { useState } from "react";

const Animals = () => {
  const [animal, setAnimal] = useState("");
  const [filter, setFilter] = useState("");
  const [animals, setAnimals] = useState(["Dog", "Lion", "Cat", "Elephant"]);

  const onChangeHandler = (event) => {
    setAnimal(event.target.value);
  };

  const onChangeFilter = (event) => {};

  const addAnimal = () => {
    if (animal.length > 0) {
      setAnimals([...animals, animal]);
      setAnimal("");
    }
  };

  return (
    <div>
      <h1 className="title">My animals</h1>

      <div>
        <input
          type="text"
          name="filter"
          value={filter}
          placeholder="Enter an animal"
          onChange={onChangeFilter}
        />
        {animals.length > 0 && (
          <div>
            <ul className="animals-list">
              {animals.map((animal) => (
                <li key={`list-${animal}`}>{animal}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <input
          type="text"
          name="animal"
          value={animal}
          placeholder="Enter an animal"
          onChange={onChangeHandler}
        />
        <input type="button" name="submit" value="Enter" onClick={addAnimal} />
      </div>
      {/* {animals.length > 0 && (
        <div>
          <ul>
            {animals.map((animal) => (
              <li key={`list-${animal}`}>{animal}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Animals;
