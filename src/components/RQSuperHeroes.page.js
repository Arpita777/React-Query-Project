import { useSuperHeroes } from "../hooks/useSuperHeroes";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useSuperHeroes();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data?.data.map((item) => (
        <p key={item.id}>
          <Link to={`/rqsuper-heroes/${item.id}`}>{item.name}</Link>
        </p>
      ))}
    </>
  );
};
