import Head from 'next/head'
import {useRouter} from 'next/router'
import { useState, useContext, useEffect } from 'react'

import styles from '../styles/Home.module.css'
import dashboardStyles from '../styles/dashboard.module.css'

import AuthContext from '../components/authentication/authContext.js'
import ActionButton from '../components/generic/action-button'
import Loading from '../components/generic/loading'

import WatchList from '../components/watchlist/watchlist'
import TD_WebsocketContext from '../components/generic/td-websocketContext'


export default function Watchlist() {
  const user = useContext(AuthContext);
  const wsCTX = useContext(TD_WebsocketContext);

  const router = useRouter();
  const [watchList, setWatchlist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!user.name) { 
      router.push('/');
      return;
    }

    const getWatchlist = async () => {
      if(user.name) {
        setIsLoading(true);
        const watchlistAPI_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/watchlist/user/${user.name}`;
        const response = await fetch(watchlistAPI_URL);
        const data = await response.json();
        setWatchlist(data);
        setIsLoading(false);
      }
    }

    getWatchlist();

  }, [user.name])

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${user.name}'s Watchlist`}</title>
        <meta name="description" content="Stock Trading Simulator Watchlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}> Watchlist </h1>
      <DashboardRedirect /> <br/><br/>
      {!isLoading ? watchList && <WatchList websocket={wsCTX.websocket} watchListData={watchList} /> : <Loading />}
    </div>
  );
}

function DashboardRedirect() {
  const router = useRouter();

  const onClick = () => {
    router.push('/dashboard');
  }

  return <ActionButton onClick={onClick} buttonText='Go to Dashboard' />
}