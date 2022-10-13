import Router from '@koa/router';
import fetch from 'isomorphic-fetch';


export const router = new Router({prefix: '/stock-info'});

// Route to fetch from Yahoo's /stock-info endpoint
router.get('/:ticker', async (ctx) => {
	const encodedParams = new URLSearchParams();
	const ticker = ctx.params['ticker'];
	encodedParams.append("symbol", ticker);

	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'X-RapidAPI-Key': process.env.RAPID_API_YAHOO_KEY,
			'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
		},
		body: encodedParams
	}

	let queryData = {};

	try {
		const response = await fetch('https://yahoo-finance97.p.rapidapi.com/stock-info', options)

		if(!response.ok) {
			throw new Error("Bad response from server");
		}
		queryData = await response.json();

	} catch (e) {
		throw new Error("Error fetching response from server!");
	}

	/* Invalid tickers still return OK 200 response in format of,
	{
		data: {
			logo_url: "",
			preMarketPrice: null,
			regularMarketPrice: null
		},
		message: "Success",
		status: 200
	} 
	so create error message if this data is received before passing to body */
	if(!queryData.data.regularMarketPrice) {
		throw new Error("Invalid ticker symbol");
	}

	ctx.body = queryData;
});

export default router;