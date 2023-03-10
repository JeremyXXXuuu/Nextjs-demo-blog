import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";

// const fetcher = async (url) => {
//   const res = await fetch(url);

//   // If the status code is not in the range 200-299,
//   // we still try to parse and throw it.
//   if (!res.ok) {
//     const error = new Error("An error occurred while fetching the data.");
//     // Attach extra info to the error object.
//     error.info = await res.json();
//     error.status = res.status;
//     throw error;
//   }

//   return res.json();
// };

let name = "user name";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }) {
  const { data: session } = useSession();

  // const { data, error } = useSWR(
  //   session
  //     ? `http://localhost:8000/me?access_token=${session.accessToken}`
  //     : null,
  //   fetcher
  // );

  // if (!data) return <div>Loading...</div>;
  // if (error) return <div>Failed to load</div>;
  // console.log("data", data);
  // console.log("error", error);
  if (session) {
    console.log(session);
    return (
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={session.user.name}
              />
              <h1 className={utilStyles.heading2Xl}>{session.user.name}</h1>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={session.user.name}
                />
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                  {session.user.name}
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">??? Back to home</Link>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
              <button onClick={() => signIn()}>Sign in</button>
            </>
          ) : (
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                  {name}
                </Link>
              </h2>
            </>
          )}
        </header>
        {/* <main>{children}</main> */}
        {/* {!home && (
          <div className={styles.backToHome}>
            <Link href="/">??? Back to home</Link>
          </div>
        )} */}
      </div>
    );
  }
}
