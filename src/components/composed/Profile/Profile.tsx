import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GithubService from "../../../services/github.service";
import HttpException from "../../../utils/exceptions/HttpException";
import { UserByLogin } from "../../../utils/interfaces/githubUser.interface";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import styles from "./Profile.module.css";
import FollowersIcon from "../../../assets/followersIcon.svg";

interface LocationStateProps {
  user: UserByLogin;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserByLogin>();
  const [error, setError] = useState<string | null>();
  const { user } = useParams();
  const location = useLocation();
  const userState = location.state as LocationStateProps;

  useEffect(() => {
    async function getUserData() {
      if (error) {
        setError(null);
      }

      if (userState && userState.user) {
        setUserData(userState.user);
      } else {
        try {
          const res = await GithubService.getUserByLogin(user || "");
          setUserData(res);
        } catch (err) {
          if (err instanceof HttpException && err.status === 404) {
            setError(`User ${user} was not found`);
          } else {
            setError("Something went wrong");
          }
        }
      }
    }
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState, user]);

  return (
    <>
      {error ? (
        <p style={{ textAlign: "center" }}>{error}</p>
      ) : userData ? (
        <div className={styles.profileWrapper}>
          <img
            src={userData.avatar_url}
            alt="user avatar"
            className={styles.avatar}
          />
          <p className={styles.nameText}>{userData.name}</p>
          <p className={styles.login}>{userData.login}</p>

          <div className={styles.statsWrapper}>
            <img
              src={FollowersIcon}
              alt="followers"
              style={{ transform: "translateY(-1px)" }}
            />
            <span>
              {`${userData.followers.toLocaleString()} follower${
                userData.followers === 1 ? "" : "s"
              }`}
            </span>
            <span className={styles.following}>
              {userData.following} following
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.spinnerWrapper}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default Profile;
