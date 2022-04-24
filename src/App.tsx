import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Layout from "./components/composed/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/composed/Profile/Profile";
import SearchInput from "./components/common/SearchInput/SearchInput";
import ResultList from "./components/composed/ResultList/ResultList";
import GithubService, { ReposAndUsersMixin } from "./services/github.service";
import HttpException from "./utils/exceptions/HttpException";

const App = () => {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 500);
  const [results, setResults] = useState<ReposAndUsersMixin>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    async function fetchData() {
      if (error) {
        setError(null);
      }

      try {
        const res = await GithubService.searchUsersAndReposByPhrase("test");
        setResults(res);
        setLoading(false);
      } catch (err) {
        if (err instanceof HttpException && err.status === 403) {
          setError("You have reached limit of requests per 60 seconds.");
        } else {
          setError("Something went wrong");
        }
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Layout
      appBarContent={() => (
        <SearchInput
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
    >
      {error ? (
        <p style={{ textAlign: "center" }}>{error}</p>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<ResultList results={results} isLoading={isLoading} />}
          />
          <Route path="/:user" element={<Profile />} />
        </Routes>
      )}
    </Layout>
  );
};

export default App;
