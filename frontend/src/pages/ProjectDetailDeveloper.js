import React from 'react';
import ApplyContactButton from '../components/ApplyContactButton';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import { Paper } from '@mui/material';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { format } from 'date-fns';

export default function ProjectDetailDeveloper() {
  // get user info with cookies when login function is fixed

  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  // const user = {
  //   _id: "668b84861e61ca37c5498f63",  //test developer: candidate 2
  // };

  const { id } = useParams(); //get project id

  // const [projectDetail, setProjectDetail] = useState([]);

  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      // const id = "667c3472880c0b162d2e1fd9"; //a test project in database
      // const id = "6687e73d2504b96838ce7473";  //project testtest
      // const id = "668a48e702ab526fcd2a81a7";

      try {
        const response = await fetch(
          `http://localhost:5050/getProject/developer/${id}`
        ); // Adjust the URL according to your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjectDetails(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!projectDetails) {
    return <Typography>No project details found</Typography>;
  }

  return (
    // /* replace <AssignmentIcon /> with avatar later */
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
      <Grid container spacing={2} sx={{ mb: 10, mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Avatar
              sx={{ width: 100, height: 100 }}
              variant="rounded"
              src={projectDetails.avatar}
              alt="Logo"
            ></Avatar>
            <Typography noWrap variant="h4">
              {projectDetails.project_name}
            </Typography>
          </Stack>

          <Stack spacing={2} mt={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <BusinessIcon color="primary" />
              <Link to={`/publisherhomepage/${projectDetails.publisher_id}`}>
                <Typography noWrap variant="h5">
                  {projectDetails.project_publisher}
                </Typography>
              </Link>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon color="primary" />

              <Typography noWrap variant="h5">
                Duration: {projectDetails.project_duration} Days
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <HourglassTopIcon color="primary" />

              <Typography noWrap variant="body1">
                Finish before:{' '}
                {format(
                  new Date(projectDetails.project_deadline),
                  'dd/MM/yyyy HH:mm:ss'
                )}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              {projectDetails.project_labels.map((label, index) => (
                <Chip key={index} label={label} />
              ))}
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack
            direction="column"
            spacing={2}
            mt={2}
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100%' }}
          >
            <Typography noWrap variant="h3">
              € {projectDetails.project_budget}
            </Typography>
            <ApplyContactButton user={user} projectDetails={projectDetails} />
          </Stack>
        </Grid>
        <Box sx={{ mt: 10 }}>
          <Grid>
            <Stack direction="column" spacing={10}>
              <Box>
                <Box>
                  <Paper elevation={0}>
                    <Typography noWrap variant="h5">
                      Your Task
                    </Typography>
                    <Typography sx={{ marginLeft: '2em' }}>
                      {projectDetails.project_description}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
              <Box>
                <Box>
                  <Paper elevation={0}>
                    <Typography noWrap variant="h5">
                      Skills required
                    </Typography>
                    <Typography sx={{ marginLeft: '2em' }}>
                      {projectDetails.project_skills}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
