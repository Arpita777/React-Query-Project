import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroes = (enabled = true) => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    enabled,
  });
};

export const useAddSuperHero = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      //queryClient.invalidateQueries("super-heroes"); /* makes additional n/w call to refetch fresh data */
      queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

/* Below is the refined version of above hook, which makes 
   optimistic updates in case real production grade applications
   to reduce latency 
*/
export const useAddSuperHero2 = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      await queryClient.cancelQueries(["super-heroes"]);
      const previousData = queryClient.getQueryData(["super-heroes"]);
      queryClient.setQueryData(["super-heroes"], (old) => ({
        ...old,
        data: [...old.data, { id: Date.now(), ...newHero }],
      }));

      return previousData;
    },
    onError: (err, newHero, context) => {
      queryClient.setQueryData(["super-heroes"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["super-heroes"]);
    },
  });
};
