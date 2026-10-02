import { useQueries } from "react-query";
import axios from "axios";

const fetchHero = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

export const DynamicQueriesPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => ({
      queryKey: ["super-heroes", id],
      queryFn: () => fetchHero(id),
    }))
  );
  console.log(queryResults);
  return <div>DynamicQueriesPage</div>;
};
