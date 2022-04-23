import Layout from "./components/composed/Layout/Layout";
// import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/composed/Profile/Profile";
import SearchInput from "./components/common/SearchInput/SearchInput";
import ResultList from "./components/composed/ResultList/ResultList";

const App = () => {
  return (
    <Layout appBarContent={() => <SearchInput placeholder="Search" />}>
      <Routes>
        <Route path="/" element={<ResultList />} />
        <Route path="/:user" element={<Profile />} />
      </Routes>
    </Layout>
  );
};

export default App;
