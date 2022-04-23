import Layout from "./components/composed/Layout/Layout";
import styles from "./App.module.css";

const App = () => {
  return (
    <Layout
      appBarContent={() => (
        <input placeholder="Search" className={styles.searchInput} />
      )}
    >
      123
    </Layout>
  );
};

export default App;
