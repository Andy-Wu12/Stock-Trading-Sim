import { useState, useEffect } from 'react';
import Link from 'next/link';

import Loading from '../generic/loading';
import ActionButton from '../generic/action-button';

import newsStyles from '../../styles/News.module.css';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const NEWS_API_URL = `${API_BASE_URL}/stock-info/news`;

export default function StockNews({symbolList}) {
  const [stockNews, setStockNews] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Self-invoking function expression
    (async function() {
      setIsLoading(true);
      const querySymbols = symbolList.join(',');
      const response = await fetch(`${NEWS_API_URL}/${querySymbols}`);
      const data = await response.json();
      setStockNews(data);
      setIsLoading(false);
    }) ();
  }, []);

  const news = [];

  if(stockNews) {
    for(const [symbol, data] of Object.entries(stockNews)) {
      const symbolList = <StockNewsSection symbol={symbol} data={data} />
      news.push(symbolList);
    }
  }

  return (
    <div className={newsStyles.news}>
      {isLoading ? <Loading /> : news}
    </div>
  )
}

function NewsLink({title, link}) {
  return (
    <>
      <Link href={link}>{title}</Link>
    </>
  )
}

function StockNewsSection({symbol, data}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={newsStyles.newsList}>
      <h3> {symbol} <ActionButton onClick={() => {}} buttonText='Hide' /> </h3>
      <ul key={`${symbol}-news`}>
        {
          data.map((newsData, i) => {
            return <li> 
                <NewsLink key={`${symbol}-newsItem-${i}`} title={newsData.title} link={newsData.link} /> 
              </li>
          })
        }
      </ul>
    </div>
  )
}