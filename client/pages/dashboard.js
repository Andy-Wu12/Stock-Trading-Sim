import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'

import styles from '../styles/Home.module.css'

import AuthContext from '../components/authContext'
import StockSearchForm from '../components/dashboard/stock-search'
import StockDetails from '../components/dashboard/stock-details'

export default function Dashboard() {
  const user = useContext(AuthContext);
  
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    console.log(stockData);
  }, [stockData])

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${user.name}'s Dashboard`}</title>
        <meta name="description" content="Stock Trading Simulator Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}> 
          Dashboard
        </h1>

        <StockSearchForm setStockData={setStockData} />
        <StockDetails stockData={stockData} />
      </div>
    </div>
  );
}
