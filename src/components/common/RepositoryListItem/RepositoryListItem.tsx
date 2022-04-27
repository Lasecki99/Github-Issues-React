import moment from "moment";
import { RepositoryItem } from "../../../utils/interfaces/githubRepository.interface";
import RepoIcon from "../../../assets/repoIcon.svg";
import StarIcon from "../../../assets/starIcon.svg";
import styles from "./RepositoryListItem.module.css";
import { checkIfDateIsOlderThan } from "../../../utils/dateChecker";

interface RepositoryListItemProps {
  repository: RepositoryItem;
}

const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

const RepositoryListItem = ({ repository }: RepositoryListItemProps) => {
  return (
    <li style={{ margin: "1.25rem 0 1rem 0" }}>
      <div className={styles.nameIconWrapper}>
        <img src={RepoIcon} alt="repository" />
        <p className={styles.nameText}>{repository.fullName}</p>
      </div>
      <p className={styles.description}>{repository.description}</p>
      <div className={styles.statsWrapper}>
        <div>
          <img src={StarIcon} alt="star" />
          <span className={styles.starsCount}>
            {repository.stargazersCount}
          </span>
        </div>

        {repository.language && (
          <div>
            <span
              className={`${styles.languageBox} ${repository.language}`}
            ></span>
            <p className={styles.language}>{repository.language}</p>
          </div>
        )}

        {repository.license && (
          <div>
            <p className={styles.license}>{repository.license.name}</p>
          </div>
        )}
        <div>
          <p className={styles.lastUpdate}>
            {!checkIfDateIsOlderThan(repository.updatedAt, thirtyDaysInMs)
              ? `Updated ${moment(repository.updatedAt).fromNow()}`
              : `Updated on ${moment(repository.updatedAt).format(
                  "Do MMM YYYY"
                )}`}
          </p>
        </div>
      </div>
    </li>
  );
};

export default RepositoryListItem;
