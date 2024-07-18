import {
  Box,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from '@mui/material';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@mui/material';

// const user = { _id: '668b84861e61ca37c5498f63' };

const initialOptions = {
  clientId:
    'AQ8p-mKOE6XzJ1tmLS6ItynEuf3_W2kaz85dV4USBvtqjCrT13m-hAGiBJoIDA4c5zgMiGCqg1QtzjO5',
  // country: 'US',
  currency: 'EUR',
  intent: 'capture',
  components: 'buttons',
  'data-sdk-integration-source': 'developer-studio',
  // Add other options as needed
};
// const [cookies] = useCookies(['user']);
// const user = cookies.user;
function Message({ content }) {
  return <p>{content}</p>;
}

export default function Subscription() {
  const [cookies] = useCookies(['user']); 
const user = cookies.user;
  const [message, setMessage] = useState('');
  const plans = [
    {
      value: '1',
      title: '5 days 1 euro',
      features: ['Feature A', 'Feature B', 'Feature C'],
      length: 'trial',
      plan: '1',
    },
    {
      value: '5',
      title: '1 month 5 euro',
      features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
      length: 'month',
      plan: '2',
    },
    {
      value: '10',
      title: '3 months 10 euro',
      features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
      length: 'quarter',
      plan: '3',
    },
    {
      value: '30',
      title: '1 year 30 euro',
      features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
      length: 'year',
      plan: '4',
    },
  ];
  // const [plans, setpPlans] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  // const [selectedPlanLength, setSelectedPlanLength] = useState("");
  const selectedPlanRef = useRef(selectedPlan);
  // const selectedPlanLengthRef = useRef(selectedPlanLength);

  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    setSelectedPlan(event.target.value);

    console.log(selectedPlan);
  };
  // this solves the async problem
  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5050/payment/subscription/plans`
  //       ); // Adjust the URL according to your API endpoint
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();

  //       setpPlans(data);
  //       console.log('subscriptionPlans', plans);
  //     } catch (error) {
  //       console.error('Failed to fetch project details:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPlans();
  // }, []);
  // if (loading) {
  //   return <CircularProgress />;
  // }

  // if (!plans) {
  //   return <Typography>No subscription plans found</Typography>;
  // }
  useEffect(() => {
    selectedPlanRef.current = selectedPlan;
    console.log('selectedPlan', selectedPlan);
  }, [selectedPlan]);

  const StyledCard = styled(Card)(({ theme, selected }) => ({
    minWidth: 300,
    borderColor: selected ? theme.palette.primary.main : 'transparent',
    borderWidth: 2,
    borderStyle: 'solid',
    transition: 'border-color 0.3s',
    boxShadow: selected ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  }));

  const FeatureList = styled('ul')({
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    '& li': {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginRight: 8,
      },
    },
  });

  const saveOrder = async (orderData) => {
    const planValue = selectedPlanRef.current;

    console.log('Selected Plan:', planValue);

    try {
      const response = await fetch(
        `http://localhost:5050/payment/subscription/${user.id}`,
        {
          method: 'POST',

          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({
            id: user._id,
            plan: planValue,
          }),
        }
      );

      const orderData = await response.json();
      console.log('orderData', orderData);
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return (
    <Box
      component="form"
      sx={{
        width: '74%',
        margin: '0 auto',
        '& .MuiTextField-root': {
          m: 1,
          width: '25ch',
        },
      }}
      noValidate
      autoComplete="off"
    >
      
        <Grid>
          <Typography variant="h4" gutterBottom>
            choose your subscription plan
          </Typography>
        </Grid>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="subscription plans"
            name="subscriptionPlans"
            value={selectedPlan}
            onChange={handleChange}
          >
            <Grid container spacing={2}>
              {plans.map((plan) => (
                <Grid item xs={12} key={plan.plan}>
                  <FormControlLabel
                    value={plan.plan}
                    control={<Radio sx={{ display: 'none' }} />}
                    label={
                      <StyledCard selected={selectedPlan === plan.plan}>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {plan.title} test NOte: 1 month exactly 30 days
                          </Typography>
                          <FeatureList>
                            {plan.features.map((feature, index) => (
                              <li key={index}>
                                <CheckIcon color="primary" />
                                <Typography variant="body2">
                                  {feature}
                                </Typography>
                              </li>
                            ))}
                          </FeatureList>
                        </CardContent>
                      </StyledCard>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
        <Grid>
        <PayPalScriptProvider options={initialOptions}>
          
          <PayPalButtons
            style={{
              shape: 'rect',

              layout: 'vertical',

              color: 'gold',

              label: 'paypal',
            }}
            createOrder={async () => {
              try {
                const response = await fetch('http://localhost:5050/paypal/orders', {
                  method: 'POST',

                  headers: {
                    'Content-Type': 'application/json',
                  },

                  // use the "body" param to optionally pass additional order information

                  // like product ids and quantities

                  body: JSON.stringify({
                    cart: [
                      {
                        id: "Subscription Plan",

                        quantity: selectedPlanRef.current,
                      },
                    ],
                  }),
                });

                const orderData = await response.json();
                console.log("orderData",orderData);

                if (orderData.id) {
                  return orderData.id;
                } else {
                  const errorDetail = orderData?.details?.[0];

                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error(error);

                setMessage(`Could not initiate PayPal Checkout...${error}`);
              }
            }}
            onApprove={async (
              data,

              actions
            ) => {
              try {
                const response = await fetch(
                  `http://localhost:5050/paypal/orders/${data.orderID}/capture`,

                  {
                    method: 'POST',

                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                );

                const orderData = await response.json();

                // Three cases to handle:

                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()

                //   (2) Other non-recoverable errors -> Show a failure message

                //   (3) Successful transaction -> Show confirmation or thank you message

                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                  // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()

                  // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/

                  return actions.restart();
                } else if (errorDetail) {
                  // (2) Other non-recoverable errors -> Show a failure message

                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                  );
                } else {
                  // (3) Successful transaction -> Show confirmation or thank you message

                  // Or go to another URL:  actions.redirect('thank_you.html');

                  const transaction =
                    orderData.purchase_units[0].payments.captures[0];

                  setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                  );

                  console.log(
                    'Capture result',

                    orderData,

                    JSON.stringify(orderData, null, 2)
                  );
                  saveOrder(orderData);
                  
                }
              } catch (error) {
                console.error(error);

                setMessage(
                  `Sorry, your transaction could not be processed...${error}`
                );
              }
            }}
          />
          </PayPalScriptProvider>
        </Grid>
        <Grid>
          <Button onClick={saveOrder}>Send Test</Button>
        </Grid>
      
    </Box>
  );
}


