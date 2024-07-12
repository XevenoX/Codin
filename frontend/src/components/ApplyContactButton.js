import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";

import IconButton from "@mui/material/IconButton";
import { Paper } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function ApplyContactButton({ user, projectDetails }) {
  console.log("user:", user);
  console.log(projectDetails);
  const [openDialog, setOpenDialog] = useState(false);
  const [motivation, setMotivation] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");

  const handleApply = async () => {
    try {
      let response = await fetch(`http://localhost:5050/applyProject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectDetails._id,
          applicantId: user.applicantId,
          motivation: motivation,
        }),
      });
      if (response.status === 200) {
        alert("Successfully applied to the project");
        // update local state or refetch project details
        window.location.reload();
      }
    } catch (error) {
      console.error("Error applying to the project:", error);
      alert("Failed to apply to the project");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMotivation("");
  };

  const handleMotivationChange = (event) => {
    setMotivation(event.target.value);
  };

  const handleContactClick = () => {
    setContactDialogOpen(true);
  };

  const handleContactClose = () => {
    setContactDialogOpen(false);
    setContactMessage("");
  };

  const handleContactSend = async () => {
    try {
      let response = await fetch(`http://localhost:5050/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.applicantId,
          message: contactMessage,
          projectId: projectDetails._id,
          publisher_id:projectDetails.publisher_id,
        }),
      });
      if (response.status === 200) {
        alert("Message sent successfully");
        handleContactClose();
      } else {
        alert("Failed to send the message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send the message");
    }
  };

  const handleContactMessageChange = (event) => {
    setContactMessage(event.target.value);
  };

  useEffect(() => {
    // Check if user has already applied
    if (Array.isArray(projectDetails.applicants)) {
      const isApplied = projectDetails.applicants.some(
        (applicant) => applicant.applicantId.toString() === user.applicantId
      );
      setAlreadyApplied(isApplied);
    }
  }, [projectDetails.applicants, user.applicantId]);
  console.log("alreadyApplied", alreadyApplied);

  useEffect(() => {
    // Calculate subscription status
    const isSubscribed = new Date(user.subscription) - new Date() > 0;
    setSubscription(isSubscribed);
  }, [user.subscription]);
  // replace with date later
  if (subscription) {
    return (
      <React.Fragment>
        <Typography noWrap variant="caption" color="grey">
          {projectDetails.applicants.length} people have applied for the task
        </Typography>
        <Button
          variant="contained"
          onClick={alreadyApplied ? null : handleOpenDialog}
          disabled={alreadyApplied}
        >
          {alreadyApplied ? "Already Applied" : "Apply Now"}
        </Button>
        <Button variant="contained" onClick={handleContactClick}>Contact</Button>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Apply for the Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide your motivation (max 100 characters):
            </DialogContentText>
            <textarea
              value={motivation}
              onChange={handleMotivationChange}
              rows={4}
              maxLength={100}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "8px",
                marginBottom: "8px",
              }}
              placeholder="Enter your motivation here..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleApply} disabled={!motivation}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>



        <Dialog open={contactDialogOpen} onClose={handleContactClose}>
          <DialogTitle>Contact</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your message:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Message"
              type="text"
              fullWidth
              variant="standard"
              value={contactMessage}
              onChange={handleContactMessageChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleContactClose}>Cancel</Button>
            <Button onClick={handleContactSend} disabled={!contactMessage}>Send</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Typography noWrap variant="caption" color="grey">
          subscribe and see how many people have applied for the task
        </Typography>
        <Button variant="contained" disabled>
          Apply Now{" "}
        </Button>
        <Button variant="contained" disabled>
          Contact
        </Button>
        <Typography noWrap variant="h5" color="black">
          only members! please
        </Typography>
        <Link to={"/subscription"}>
          <Typography noWrap variant="h5" color="red">
            subscribe
          </Typography>
        </Link>
      </React.Fragment>
    );
  }
}
