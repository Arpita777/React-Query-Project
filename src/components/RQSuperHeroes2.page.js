import { useSuperHeroes } from "../hooks/useSuperHeroes";

export const RQSuperHeroesPage2 = () => {
  const { isFetching, data, isError, error, refetch } = useSuperHeroes(false);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      <button onClick={refetch}>Fetch</button>
      {data?.data.map((item) => (
        <p id={item.id}>{item.name}</p>
      ))}
    </>
  );
};
