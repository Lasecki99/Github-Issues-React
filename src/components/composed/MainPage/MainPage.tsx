import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import GithubService, {
  ReposAndUsersMixin,
} from "../../../services/github.service";
import HttpException from "../../../utils/exceptions/HttpException";
import ResultList from "../ResultList/ResultList";

interface MainPageProps {
  text: string;
}

const MainPage = ({ text }: MainPageProps) => {
  const [value] = useDebounce(text, 500);
  const [results, setResults] = useState<ReposAndUsersMixin>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      if (error) {
        setError(null);
      }

      try {
        const res = await GithubService.searchUsersAndReposByPhrase(
          value || "nodejs"
        );
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

  const resultList = useMemo(
    () => <ResultList results={results} isLoading={isLoading} />,
    [results, isLoading]
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
