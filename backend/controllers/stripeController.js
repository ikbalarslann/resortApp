import stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

const getPayment = (req, res, next) => {
  console.log("Hello from Stripe");
  res.json({ message: "Hello from Stripe!" });
};
const createPayment = async (req, res, next) => {
  console.log(req.body.token);
  const { product, token } = req.body;
  const idempotencyKey = uuidv4();

  return stripeInstance.customers
    .create({
      email: token.email,
      source: token,
    })
    .then((customer) => {
      stripeInstance.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

export { getPayment, createPayment };
