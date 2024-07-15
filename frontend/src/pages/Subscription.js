import {
  Box,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleChange = (event) => {
    setSelectedPlan(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        width: "74%",
        margin: "0 auto",
        "& .MuiTextField-root": {
          m: 1,
          width: "25ch",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid>
        <Typography>choose your subscription plan</Typography>
      </Grid>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="subscription plans"
          name="subscriptionPlans"
          value={selectedPlan}
          onChange={handleChange}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                value="1"
                control={<Radio />}
                label={
                  <Card sx={{ minWidth: 180 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        5 days 1 euro
                      </Typography>
                    </CardContent>
                  </Card>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                value="5"
                control={<Radio />}
                label={
                  <Card sx={{ minWidth: 180 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        1 month 5 euro
                      </Typography>
                    </CardContent>
                  </Card>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                value="10"
                control={<Radio />}
                label={
                  <Card sx={{ minWidth: 180 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        3 months 10 euro
                      </Typography>
                    </CardContent>
                  </Card>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                value="30"
                control={<Radio />}
                label={
                  <Card sx={{ minWidth: 180 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        1 year 30 euro per month
                      </Typography>
                    </CardContent>
                  </Card>
                }
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
      <Grid>
        <PayPalScriptProvider options={{ clientId: "test" }}>
          <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
      </Grid>
    </Box>
  );
};

export default Subscription;
