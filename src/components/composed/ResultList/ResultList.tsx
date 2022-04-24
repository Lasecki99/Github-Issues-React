import { Fragment } from "react";
import { ReposAndUsersMixin } from "../../../services/github.service";
import Divider from "../../common/Divider/Divider";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import RepositoryListItem from "../../common/RepositoryListItem/RepositoryListItem";
import UserListItem from "../../common/UserListItem/UserListItem";
import styles from "./ResultList.module.css";

interface ResultListProps {
  results: ReposAndUsersMixin | undefined;
  isLoading: boolean;
}

const ResultList = ({ results, isLoading }: ResultListProps) => {
  if (results && results.items.length === 0) {
    return <p style={{ textAlign: "center" }}>Nothing was found</p>;
  }

  return (
    <div>
      {results ? (
        <>
          <p className={styles.resultsText}>
            {`${results.total_count.toLocaleString()} result${
              results.total_count === 1 ? "" : "s"
            }`}
          </p>
          <Divider />
          <ul style={{ listStyle: "none", opacity: isLoading ? 0.5 : 1 }}>
            {results.items.map((item) =>
              "type" in item ? (
                <Fragment key={item.id}>
                  <UserListItem user={item} />
                  <Divider />
                </Fragment>
              ) : (
                <Fragment key={item.id}>
                  <RepositoryListItem repository={item} />
                  <Divider />
                </Fragment>
              )
            )}
          </ul>
        </>
      ) : (
        <div className={styles.spinnerWrapper}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ResultList;
