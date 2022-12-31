import { useState } from "react";

const Animals = () => {
  const [animal, setAnimal] = useState("");
  const [filter, setFilter] = useState("");
  const [animals, setAnimals] = useState(["Dog", "Lion", "Cat", "Elephant"]);

  const onChangeHandler = (event) => {
    setAnimal(event.target.value);
  };

  const onChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const addAnimal = () => {
    if (animal.length > 0) {
      setAnimals([...animals, animal]);
      setAnimal("");
    }
  };

  return (
    <div>
      <h1 className="title">My animals</h1>

      <form>
        <div>
          <input
            type="text"
            name="filter"
            value={filter}
            placeholder="Search an animal"
            onChange={onChangeFilter}
          />
        </div>

        <div className="row-container">
          <input
            type="text"
            name="animal"
            value={animal}
            placeholder="Add an animal"
            onChange={onChangeHandler}
          />
          <input type="button" name="submit" value="Add" onClick={addAnimal} />
        </div>
      </form>

      {animals.length > 0 && (
        <div>
          <ul className="animals-list">
            {animals
              .filter((animal) =>
                animal.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
              )
              .map((animal) => (
                <li key={`list-${animal}`}>{animal}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Animals;
