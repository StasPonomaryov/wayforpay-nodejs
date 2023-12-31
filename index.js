require('dotenv').config();
const WayForPay = require('./adapters/WayForPay.js')

const merchantAccount = process.env.WAYFORPAY_DOMAIN;
const merchantSecret = process.env.WAYFORPAY_SECRET;
const wayForPayApi = process.env.WAYFORPAY_URL;
// Example products
const items = [
  {
    name: 'Apple',
    price: 50,
    count: 1
  },
  {
    name: 'Orange',
    price: 50,
    count: 2
  }
];
// Config for adapter
const payment = WayForPay({
  account: merchantAccount,
  secret: merchantSecret,
  apiUrl: wayForPayApi,
});
// Example order
const order = {
  id: Date.now(),
  items: items.map((i) => (
    { product_name: i.name, price: i.price, count: i.count }
  )),
  amount: 200,
  currency: 'UAH',
  domain: 't.me'
};
// Get invoice URL for using in front-end
payment.prepareInvoice(order)
  .then((data) => {
    if (!data || data.reasonCode > 1100) {
      throw new Error(
        `Invoice error: [${data.reasonCode}] ${data.reason}`
      );
    }
    console.log('>>>PREPARED INVOICE', data.data);
  })
  .catch((e) => {
    throw new Error(`Request error: ${e}`);
  });


