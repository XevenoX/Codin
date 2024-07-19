// FrequentlyAskedQuestions.js
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FrequentlyAskedQuestions() {
  return (
    <Box sx={{ padding: '40px' }}>
      <Box>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Frequently Asked Questions by Developers
        </Typography>
        <Box sx={{ mb: 10 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>
                As a developer, can I apply for a project without registration?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No. You have to register your account before sending application
                to task publisher.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>
                As a developer, must I subscribe before applying for a project?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, you have to subscribe our service before applying for
                projects. You can click on your profile image in the upper right
                corner of the website, clicks on the subscription button and
                goes to the subscription page. On this page, we offer you
                options: subscribing for five days, a month, a quarter, or a
                year.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>
                As a developer, how could I contact the task publisher before
                application?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Before deciding to apply, you may have questions that need
                answers from the project publisher. Therefore, we provide a
                'Contact' button. Clicking this button will bring up a popup
                containing a text field. You can write your question in the
                field and, upon sending, it is emailed to the task publisher.
                Publisher can respond via email. We consider this communication
                mechanism simpler and more efficient than a chat feature, as we
                anticipate that neither party will spend extended periods on our
                site or visit frequently, but they can always receive work
                emails. Therefore, communicating via email is preferred.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>
                As a developer, how could I receive money after completing the
                task?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                The contract amount paid by the publisher would be temporarily
                held by us and be transferred to you once the project is
                completed.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Frequently Asked Questions by Publishers
        </Typography>
      </Box>
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              As a publisher, how should I choose candidates and pay?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              On your management page, you can compare the candidates for your
              project and pay. For compare, you could two to four applicants
              from the candidate list and click the 'Compare' button to compare
              them side by side. Upon clicking, the selected applicants will be
              horizontally compared based on a series of attributes, such as
              universities, development skills, and ratings. With the click on
              ‘Offer’, you will see a popup for PayPal and should then go
              through the payment process. The contract amount paid would be
              temporarily held by us and be transferred to developers once the
              project is completed.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              As a publisher, can I pay with credit cards?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No. The only payment method we accept is PayPal.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
