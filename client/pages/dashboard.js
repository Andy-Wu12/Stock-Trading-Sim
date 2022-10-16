import Head from 'next/head'
import { useState, useContext } from 'react'

import styles from '../styles/Home.module.css'

import AuthContext from '../components/authContext'
import StockSearchForm from '../components/dashboard/stock-search'

export default function Dashboard() {
  const user = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Head>
        <title> {user.name}'s Dashboard </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}> 
          Dashboard
        </h1>

        <StockSearchForm />
      </div>
    </div>
  );
}
