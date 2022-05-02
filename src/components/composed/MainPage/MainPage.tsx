import { useMemo } from "react";
import useSearchUsersAndRepos from "../../../hooks/useSearchUsersAndRepos";
import ResultList from "../ResultList/ResultList";

interface MainPageProps {
  text: string;
}

const MainPage = ({ text }: MainPageProps) => {
  const { result, error, isFetching } = useSearchUsersAndRepos(text);

  const resultList = useMemo(
    () => <ResultList results={result} isLoading={isFetching} />,
    [result, isFetching]
  );

  return (
    <>
      {error ? (
        <p style={{ textAlign: "center" }}>{error}</p>
      ) : (
        <>{resultList}</>
      )}
    </>
  );
};

export default MainPage;
