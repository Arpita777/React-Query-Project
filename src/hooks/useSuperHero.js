import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHero = (heroId) => {
  const queryClient = useQueryClient();
  const fetchInitialData = (heroId) => {
    const hero = queryClient
      .getQueryData("super-heroes")
      ?.data.find((hero) => hero.id === heroId);
    if (hero) {
      return {
        data: hero,
      };
    } else {
      return undefined;
    }
  };
  return useQuery({
    queryKey: ["super-heroes", heroId],
    queryFn: fetchSuperHero,
    initialData: () => fetchInitialData(heroId),
  });
};
