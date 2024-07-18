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
const user = { _id: '668b84861e61ca37c5498f63' };


const initialOptions = {
  clientId:
    'AQ8p-mKOE6XzJ1tmLS6ItynEuf3_W2kaz85dV4USBvtqjCrT13m-hAGiBJoIDA4c5zgMiGCqg1QtzjO5',
  currency: 'EUR',
  // Add other options as needed
};
// const [cookies] = useCookies(['user']);
// const user = cookies.user;

export default function Subscription() {
  const plans = [
  { value: '1', title: '5 days 1 euro', features: ["Feature A", "Feature B", "Feature C"], length:"trial", plan:"1"},
  { value: '5', title: '1 month 5 euro', features: ["Feature A", "Feature B", "Feature C", "Feature D"], length:"month", plan: "2"},
  { value: '10', title: '3 months 10 euro', features: ["Feature A", "Feature B", "Feature C", "Feature D"], length:"quarter", plan:"3"},
  { value: '30', title: '1 year 30 euro',features: ["Feature A", "Feature B", "Feature C", "Feature D"], length:"year", plan: "4"},
];
  // const [plans, setpPlans] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  // const [selectedPlanLength, setSelectedPlanLength] = useState("");
  const selectedPlanRef = useRef(selectedPlan);
  // const selectedPlanLengthRef = useRef(selectedPlanLength);

  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    setSelectedPlan(event.target.value);

    // console.log(selectedPlan);
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
    console.log("selectedPlan",selectedPlan);
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

  const styles = {
    shape: 'rect',

    // layout: "vertical",
    layout: 'horizontal',
  };
  const messages = {
    amount: 100,

    align: 'center',

    color: 'black',

    position: 'top',
  };

  const createOrder = async () => {
    const planValue = selectedPlanRef.current;
    //   const planLength = selectedPlanLengthRef.current;

    console.log('Selected Plan:', planValue);
    //   console.log("Selected Plan Length:", planLength);

    // console.log("Selected Plan:", selectedPlan);
    //   console.log("Selected Plan Length:", selectedPlanLength);

    try {
      const response = await fetch(
        `http://localhost:5050/payment/subscription/${user._id}`,
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

      // if (!orderData.id) {

      //     const errorDetail = orderData.details[0];

      //     const errorMessage = errorDetail

      //         ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`

      //         : "Unexpected error occurred, please try again.";

      //     throw new Error(errorMessage);

      // }

      // return orderData.id;
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
                              <Typography variant="body2">{feature}</Typography>
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
          <ButtonBehavior plans={plans} selectedPlan={selectedPlan}/>
        </PayPalScriptProvider>
      </Grid>
      <Grid>
        <Button onClick={createOrder}>Send Test</Button>
      </Grid>
    </Box>
  );
}

function ButtonBehavior({ plans, selectedPlan }) {
  /**
   * usePayPalScriptReducer use within PayPalScriptProvider
   * isPending: not finished loading(default state)
   * isResolved: successfully loaded
   * isRejected: failed to load
   */
  
  const [{ isPending }] = usePayPalScriptReducer();
  const selectedPlanDetails = plans.find(plan => plan.plan === selectedPlan) || {};
  console.log(selectedPlanDetails);
  let sendamount=setAmount(plans, selectedPlan);


  
  console.log("amount",sendamount);
  const paypalbuttonTransactionProps = {
    style: { layout: 'vertical' },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: selectedPlanDetails.value,
            },
          },
        ],
      });
    },
    onApprove(data, actions) {

      return actions.order.capture({}).then((details) => {
        alert(
          'Transaction completed by' +
            (details?.payer.name.given_name ?? 'No details')
        );

        alert('Data details: ' + JSON.stringify(data, null, 2));
      });
    },
  };
  return (
    <>
      {isPending ? <h2>Load Smart Payment Button...</h2> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
}

function setAmount(plans, selectedPlan){
  const selectedPlanDetails = plans.find(plan => plan.plan === selectedPlan) || {};
  console.log(selectedPlanDetails);
  let amount = selectedPlanDetails.value;

  if(selectedPlanDetails.plan==="1"){
    amount='1';
    
    // amount = plans[0].value;
    // console.log("plans[0]",plans[0]);
  }
  if(selectedPlanDetails.plan==="2"){
    amount='5';
    // amount = plans[1].value;
    // console.log("plans[1]",plans[1]);
  }else if(selectedPlanDetails.plan==="3"){
    amount='10';
    // amount = plans[2].value;
    // console.log("plans[2]",plans[2]);
  }
  else if(selectedPlanDetails.plan=="4"){
    amount='30';
    // amount = plans[3].value;
    // console.log("plans[3]",plans[3]);
  }
console.log("setAmount",amount);
  return amount;
}