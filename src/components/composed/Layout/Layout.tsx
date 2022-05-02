import Logo from "../../common/Logo/Logo";
import styles from "./Layout.module.css";

type LayoutProps = {
  appBarContent: JSX.Element;
  children: React.ReactNode;
};

const Layout = ({ appBarContent, children }: LayoutProps) => {
  return (
    <>
      <header className={styles.appbar}>
        <Logo />

        <div>{appBarContent}</div>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
