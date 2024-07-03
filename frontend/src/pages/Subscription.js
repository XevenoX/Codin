import { Box } from "@mui/material";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const Subscription = () => {
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
      <Grid>
        <Card sx={{ minWidth: 180 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              1 month 5 euro per month
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="contained">choose this one</Button>
          </CardActions>
        </Card>
      </Grid>
      <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    </Box>
  );
};

export default Subscription;
