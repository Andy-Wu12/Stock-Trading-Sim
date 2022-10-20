import Router from '@koa/router';

import Transaction from '../mongodb/models/transaction.js';
import User from '../mongodb/models/user.js';
import Portfolio from '../mongodb/models/portfolio.js';

export const router = new Router({prefix: '/transaction'});

router.post('/buy', async (ctx) => {
  const queryDict = ctx.request.query;
  const postBody = ctx.request.body;

  const username = postBody.username;
  const price = postBody.price;
  const symbol = queryDict.symbol;

  // Hardcode quantity for now
  const quantity = 1;

  try {
    if(queryDict === '{}') {
      throw new Error('Invalid request');
    }

    const user = await User.findOne({username: username});
    const transactionCost = quantity * price;

    if(user.balance < transactionCost) {
      throw new Error('User balance too low for transaction');
    }

    const transaction = new Transaction({
      username: username,
      symbol: symbol,
      action: 'buy', 
      quantity: quantity, 
      price: price
    });
    transaction.save();

    // Update User's portfolio holdings
    const portfolio = await Portfolio.findOne({username: username});

    await Portfolio.updateOne(
      {username: username},
      {
        value: portfolio.value + (price * quantity),
        $push: {holdings: {
        symbol: symbol,
        quantity: quantity,
        pricePerShare: price
      }}},
    );
    
    await User.updateOne(
      {username: username},
      {balance: user.balance - transactionCost}
    );


    ctx.status = 200;
    ctx.body = {message: 'Transaction successful', status: ctx.status};
    
  } catch(e) {
    ctx.status = 400;
    ctx.body = {message: e.message, status: ctx.status}
  }

});

router.post('/sell', async (ctx) => {
  const queryDict = ctx.request.query;
  const postBody = ctx.request.body;

  const username = postBody.username;
  const price = postBody.price;
  const symbol = queryDict.symbol;

  // Hardcode quantity for now
  const quantity = 1;

  try {
    if(queryDict === '{}') {
      throw new Error('Invalid request');
    }
    
    // TODO: Check if user owns shares before transaction is made.
    const transaction = new Transaction({
      username: username, 
      symbol: symbol, 
      action: 'sell', 
      quantity: quantity,
      price: price
    });
    transaction.save();

    ctx.status = 200;
    ctx.body = {message: 'Transaction successful', status: ctx.status};
    
  } catch(e) {
    ctx.status = 400;
    ctx.body = {message: 'Bad request', status: ctx.status}
  }

});

export default router;
