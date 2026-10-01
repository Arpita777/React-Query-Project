import { useParams } from "react-router-dom";
import { useSuperHero } from "../hooks/useSuperHero";

export const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const { isLoading, isError, error, data } = useSuperHero(heroId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  console.log(data);
  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};
