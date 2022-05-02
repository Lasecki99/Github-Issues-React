import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import Layout from "./components/composed/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/composed/Profile/Profile";
import SearchInput from "./components/common/SearchInput/SearchInput";
import MainPage from "./components/composed/MainPage/MainPage";

const App = () => {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 500);

  const mainPage = useMemo(() => <MainPage text={value} />, [value]);

  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  return (
    <Layout
      appBarContent={
        <SearchInput
          placeholder="Search"
          value={text}
          maxLength={256}
          onInputChange={(text) => setText(text)}
        />
      }
    >
      <Routes>
        <Route path="/" element={mainPage} />
        <Route path="/:user" element={<Profile />} />
      </Routes>
    </Layout>
  );
};

export default App;
