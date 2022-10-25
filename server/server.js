const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'your_stripe_payment_key'
);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.post('/checkout', async (req, res) => {
  /*
    req.body.items
    [{id:1, quantity:7},{}]
    ----------
    Stripe uses line items under a line_items variable, it expects the following format:
    [{price:1, quantity:7},{}] --> this is annoying, our id is now named "price" which is confusing.
    */
  console.log(req.body);
  const items = req.body.items;
  let lineItems = []; //This will be our properly formatted data expected by stripe.
  items.forEach((item) => {
    lineItems.push({ price: item.id, quantity: item.quantity });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.status(200).json({
    url: session.url,
    // show the user the url that stripe has created for him/her.
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log('Server is listening to port ' + PORT));