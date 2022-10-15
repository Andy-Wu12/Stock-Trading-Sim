import Head from 'next/head'
import { useState, useContext } from 'react'

import styles from '../styles/Home.module.css'
import formStyles from '../styles/forms.module.css'

import ToggleableForm from '../components/toggle-form'
import Footer from '../components/footer'
import AuthContext from '../components/authContext'

export default function Home() {
  const user = useContext(AuthContext);
  console.log(user);

  return (
    <>
      {user.name ? <HomePage /> : <LandingPageForm />}
    </>
  );
}

function LandingPageForm() {
  const [isLogin, setIsLogin] = useState(false);
  
  function handleClick(e) {
    setIsLogin(e.target.checked);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Stock Trading Simulator
        </h1>

        <p className={styles.description}>
          Get started with a virtual $100000 and test out your trading strategies
          without wasting a single cent.
        </p>

      <ToggleableForm isLogin={isLogin} handleClick={handleClick}/>
      </main>

      <Footer />      
    </div>
  )
}

function HomePage() {
  const user = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Head>
        <title> Stock Trade Sim </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome, {user.name}
        </h1>

        <p className={styles.description}>
          Get started with a virtual $100000 and test out your trading strategies
          without wasting a single cent.
        </p>
      </main>

      <Footer />
    </div>
  )
}