import { ReposAndUsersMixin } from "../../../services/github.service";

interface ResultListProps {
  results: ReposAndUsersMixin | undefined;
  isLoading: boolean;
}

const ResultList = ({ results, isLoading }: ResultListProps) => {
  if (results && results.items.length === 0) {
    return <p style={{ textAlign: "center" }}>Nothing was found</p>;
  }

  return <ul style={{ opacity: isLoading ? 0.5 : 1 }}></ul>;
};

export default ResultList;
