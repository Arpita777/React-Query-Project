import { useState } from "react";
import { useAddSuperHero, useSuperHeroes } from "../hooks/useSuperHeroes";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const { isLoading, data, isError, error, refetch } = useSuperHeroes();
  const { mutate } = useAddSuperHero();

  const handleAddHeroClick = () => {
    mutate({ name, alterEgo });
    setName("");
    setAlterEgo("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
      />
      <button onClick={handleAddHeroClick}>Add Super Hero</button>
      <br />
      <button onClick={refetch}>Fetch Super Heroes</button>
      {data?.data.map((item) => (
        <p key={item.id}>
          <Link to={`/rqsuper-heroes/${item.id}`}>{item.name}</Link>
        </p>
      ))}
    </>
  );
};
