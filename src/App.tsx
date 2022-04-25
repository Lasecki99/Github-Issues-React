import { useEffect, useState } from "react";
import Layout from "./components/composed/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/composed/Profile/Profile";
import SearchInput from "./components/common/SearchInput/SearchInput";
import MainPage from "./components/composed/MainPage/MainPage";

const App = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

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
        <Route path="/" element={<MainPage text={text} />} />
        <Route path="/:user" element={<Profile />} />
      </Routes>
    </Layout>
  );
};

export default App;
