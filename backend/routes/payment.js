import express from "express";
// Remember to add this to app.use in server.js
// This will help us connect to the database
import { getDB } from "../db/connection.js";
import { Double, ObjectId } from "mongodb";
import paypal from "paypal-rest-sdk";

import dotenv from "dotenv";

// Load environmental variables
dotenv.config({ path: "./.env" });

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM",
  client_secret: "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM",
});
const plans = [
  {
    value: "1",
    title: "5 days 1 euro",
    features: ["Feature A", "Feature B", "Feature C"],
    length: "trial",
    plan: "1",
  },
  {
    value: "5",
    title: "1 month 5 euro",
    features: ["Feature A", "Feature B", "Feature C", "Feature D"],
    length: "month",
    plan: "2",
  },
  {
    value: "10",
    title: "3 months 10 euro",
    features: ["Feature A", "Feature B", "Feature C", "Feature D"],
    length: "quarter",
    plan: "3",
  },
  {
    value: "30",
    title: "1 year 30 euro",
    features: ["Feature A", "Feature B", "Feature C", "Feature D"],
    length: "year",
    plan: "4",
  },
];

// const uri = process.env.ATLAS_URI || "";
// Router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you create a new record.
// const project_posttime =  new Date();
router.get("/subscription/plans", async (req, res) => {
  try {
    res.status(200).json(plans);
  } catch (error) {
    console.error("Failed to fetch subscription plans", error);
    res
      .status(500)
      .send("Internal Server Error, Failed to fetch subscription plans");
  }
});
router.post("/subscription/:id", async (req, res) => {
  const db = getDB();
  // console.log(req.body.plan);
  const selectedPlan = calculatePayment(req.body.plan);
  console.log(selectedPlan);
  // do it later
  // const order = await createOrder(selectedPlan);
  //check newest subscription
  let collection = await db.collection("subscriptions");
  let query = { user_id: new ObjectId(req.body.id) };
  // let user = await collection.findOne(query);
  const subscriptionHistory = await collection.find(query).toArray();
  console.log(subscriptionHistory);

  // res.json(order);
  // res.status(200).json("Paid successfully");
  let newest = new Date("2000-09-01T22:00:00.000+00:00");

  let start = calculateStart(newest, subscriptionHistory);
  let end = calculateEnd(start, selectedPlan.length);
  console.log("start,end", start, end);

  try {
    let newDocument = {
      user_id: new ObjectId(req.body.id),
      start: start,
      end: end,
    };
    let collection = await db.collection("subscriptions");
    let result = await collection.insertOne(newDocument);
    res.status(201).json({ result }); // to get the id of just stored new project
    console.log(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

router.get("/checkSubscription/:id", async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    console.log("req.body", id);
    //check newest subscription
    let collection = await db.collection("subscriptions");
    let query = { user_id: new ObjectId(id) };

    const subscriptionHistory = await collection.find(query).toArray();
    console.log(subscriptionHistory);

    let newest = new Date("2000-09-01T22:00:00.000+00:00");

    newest = calculateStart(newest, subscriptionHistory);

    console.log("newest", newest);
    res.status(200).json({ newest });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting subscrption");
  }
});

router.post("/project/:id", async (req, res) => {
  const db = getDB();
  const { id } = req.params; //project id
  // console.log(req.body);
  
  // do it later
  // const order = await createOrder(selectedPlan);
  //check newest subscription
  
  



  try {
    let newDocument = {
      project_id: new ObjectId(id),
      time: new Date(),
      amount:req.body.value,
      publisher_id:new ObjectId(req.body._id),
    };
    
    let collection = await db.collection("payedProjects");
    
    let payment = await collection.insertOne(newDocument);
    console.log(payment);

    let updates ={
      payed:payment.insertedId
    };
    
    let result = await db.collection("projects").updateOne({ _id: new ObjectId(id) }, { $set: updates });
    res.status(201).json({ result });
    // let query = { _id: new ObjectId(id) };
    // console.log(id);
    // const update = {
    //   payed:true,
    // }
  
    // const result = await db.collection("projects").updateOne({ _id: new ObjectId(id) }, { $set: updates });
    // let newDocument = {
    //   user_id: new ObjectId(req.body._id),
    //   start: start,
    //   end: end,
    // };
    // let collection = await db.collection("subscriptions");
    // let result = await collection.insertOne(newDocument);
    // res.status(201).json({ result }); // to get the id of just stored new project
    // console.log(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// use the orders api to create an order

function createOrder(data) {
  // create accessToken using your clientID and clientSecret
  //change to automated generate later
  const accessToken =
    "A21AALwFKYtpwWtMIMUVyxUfjYMHGxSeyfaVWkB74ZVcSB9imCf7eYnCsJXLVKlhZ1yp3ZWD9Ja3eyXoCYP8x2psudoI6_3IA";

  // for the full stack example, please see the Standard Integration guide

  // https://developer.paypal.com/docs/multiparty/checkout/standard/integrate/

  return fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify({
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",

            value: data.value,
          },

          reference_id: "d9f80740-38f0-11e8-b467-0ed5f89f718b",
        },
      ],

      intent: "CAPTURE",

      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",

            payment_method_selected: "PAYPAL",

            brand_name: "Codin",

            locale: "de-DE",

            landing_page: "LOGIN",

            shipping_preference: "GET_FROM_FILE",

            user_action: "PAY_NOW",

            return_url: "https://example.com/returnUrl",

            cancel_url: "https://example.com/cancelUrl",
          },
        },
      },
    }),
  }).then((response) => response.json());
}

function calculatePayment(plan) {
  if (plan === plans[0].plan) {
    return plans[0];
  } else if (plan === plans[1].plan) {
    return plans[1];
  } else if (plan === plans[2].plan) {
    return plans[2];
  } else if (plan === plans[3].plan) {
    return plans[3];
  }
}
function calculateEnd(start, length) {
  let end = new Date(start);
  if (length === "trial") {
    end.setDate(end.getDate() + 5);
  } else if (length === "month") {
    end.setDate(end.getDate() + 30);
  } else if (length === "quarter") {
    end.setDate(end.getDate() + 90);
  } else if (length === "year") {
    end.setDate(end.getDate() + 360);
  }
  return end;
}
function calculateStart(newest, subscriptionHistory) {
  let start = newest;
  if (subscriptionHistory) {
    for (let subscription of subscriptionHistory) {
      if (new Date(subscription.end) - newest > 0) {
        newest = new Date(subscription.end);
      }
    }
    if (newest - new Date() > 0) {
      start = newest;
    } else {
      start = new Date();
    }
    return start;
  }
}

export default router;
