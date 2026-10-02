import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { RQSuperHeroesPage2 } from "./components/RQSuperHeroes2.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";
import { DynamicQueriesPage } from "./components/DynamicQueries.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/super-heroes">Traditional Super Heroes</Link>
            <Link to="/rqsuper-heroes">RQSuper Heroes</Link>
            <Link to="/rqsuper-heroes2">RQSuper Heroes2</Link>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/rqsuper-heroes/:heroId"
              element={<RQSuperHeroPage />}
            />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rqsuper-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rqsuper-heroes2" element={<RQSuperHeroesPage2 />} />
            <Route
              path="/rq-parallel-queries"
              element={<ParallelQueriesPage />}
            />
            <Route
              path="/rq-dynamic-queries"
              element={<DynamicQueriesPage heroIds={[880, 882]} />}
            />
            <Route
              path="/rq-dependent-queries"
              element={<DependentQueriesPage email={"arpitab@gmail.com"} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
