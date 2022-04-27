import { Link } from "react-router-dom";
import { UserByLogin } from "../../../utils/interfaces/githubUser.interface";
import styles from "./UserListItem.module.css";
interface UserListItemProps {
  user: UserByLogin;
}

const UserListItem = ({ user }: UserListItemProps) => {
  return (
    <li style={{ margin: "1.25rem 0 1rem 0" }}>
      {user.name && (
        <div className={styles.nameIconWrapper}>
          <img
            src={user.avatarUrl}
            alt="user avatar"
            className={styles.userAvatar}
          />
          <Link
            to={`/${user.login}`}
            state={{ user }}
            className={styles.nameText}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.name}
          </Link>
        </div>
      )}
      {user.login && <p className={styles.login}>{user.login}</p>}
      {user.bio && <p className={styles.bio}>{user.bio}</p>}
      {user.location && <p className={styles.location}>{user.location}</p>}
    </li>
  );
};

export default UserListItem;
