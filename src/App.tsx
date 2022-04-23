import { useEffect, useState } from "react";
import Layout from "./components/composed/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/composed/Profile/Profile";
import SearchInput from "./components/common/SearchInput/SearchInput";
import ResultList from "./components/composed/ResultList/ResultList";

import { useDebounce } from "use-debounce";
import GithubService from "./services/github.service";

const App = () => {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 500);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GithubService.searchUsersAndReposByPhrase("test");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
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
      <Routes>
        <Route path="/" element={<ResultList />} />
        <Route path="/:user" element={<Profile />} />
      </Routes>
    </Layout>
  );
};

export default App;
