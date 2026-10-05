import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchColors = ({ pageParam = 1 }) => {
  //return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
  return axios.get(
    `http://localhost:4000/colors?_page=${pageParam}&_per_page=2`
  );
};
export const InfiniteQueryPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["colors"],
      queryFn: fetchColors,
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });
  return (
    <div>
      <h2>InfiniteQueryPage</h2>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.data.data.map((color) => (
            <p key={color.id}>
              {color.id}. {color.name}
            </p>
          ))}
        </div>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
      >
        {isFetchingNextPage ? "Loading More" : "Load More"}
      </button>
    </div>
  );
};
