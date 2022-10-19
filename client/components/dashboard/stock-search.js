import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'

export default function StockSearchForm({setStockData}) {  
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const tickerSymbol = e.target.ticker.value;
    if(!tickerSymbol) {
      // Another option is to setStockData(null) to show error in StockDetail component, 
      // but this may be against good UX
      return;
    }

    router.push(`/dashboard/?symbol=${tickerSymbol.toUpperCase()}`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stock-info/${tickerSymbol}`);
    const stockData = await response.json();
    setStockData(stockData);
  }

  return (
    <>
      <form className={styles.card} method='GET' onSubmit={handleSubmit}>
        <label htmlFor='ticker'> Search Ticker Symbol </label><br/>
        <input type='text' placeholder='AAPL' name='ticker-symbol' id='ticker' />
        <button type='submit'> Search </button>
      </form>
    </>
  )
}
