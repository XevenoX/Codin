import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import { FormControl, FormLabel, FormGroup } from '@mui/material';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { de } from 'date-fns/locale';
import { parseISO, formatISO } from 'date-fns';
const timeZone = 'Europe/Berlin';

export default function ProjectCreate() {
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const [projectName, setProjectName] = useState('');
  const [projectDuration, setProjectDuration] = useState('');
  const [projectApplicationDeadline, setProjectApplicationDeadline] =
    useState('');
  const [projectBudget, setProjectBudget] = useState('');

  const [projectDescription, setProjectDescription] = useState('');
  const [projectSkills, setProjectSkills] = useState('');
  // const [projectPublisher, setProjectPublisher] = useState("test");
  //default: all labels are unchosen
  const [projectLabels, setProjectLabels] = useState({
    Java: 0,
    React: 0,
    NodeJS: 0,
    Python: 0,
    Ruby: 0,
    PHP: 0,
    HTML: 0,
    CSS: 0,
    Angular: 0,
    Vue: 0,
    TypeScript: 0,
    jQuery: 0,
    Bootstrap: 0,
    Sass: 0,
    TailwindCSS: 0,
    Firebase: 0,
    MongoDB: 0,
    MySQL: 0,
    PostgreSQL: 0,
  });

  const [isProjectNameValid, setIsProjectNameValid] = useState(true);
  const [isBudgetValid, setIsBudgetValid] = useState(true);
  const [isDurationValid, setIsDurationValid] = useState(true);
  const [isApplicationDeadlineValid, setisApplicationDeadlineValid] =
    useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const getBerlinDate = () => {
    return new Date();
  };
  const today = getBerlinDate();

  const navigate = useNavigate();

  useEffect(() => {
    setIsProjectNameValid(projectName !== '');
    setIsBudgetValid(
      !isNaN(projectBudget) &&
        projectBudget !== '' &&
        Number(projectBudget) <= 3000
    );
    setIsDurationValid(
      !isNaN(projectDuration) &&
        projectDuration !== '' &&
        Number.isInteger(Number(projectDuration)) &&
        Number(projectDuration) > 0 &&
        Number(projectDuration) <= 28
    );
    const today = new Date().toISOString().split('T')[0];
    setisApplicationDeadlineValid(projectApplicationDeadline > today);

    setIsFormValid(
      isProjectNameValid &&
        isBudgetValid &&
        isDurationValid &&
        isApplicationDeadlineValid
    );
    console.log(`Name validity changed: ${isProjectNameValid}`);
    console.log(`projectBudget validity changed: ${isBudgetValid}`);
    console.log(`projectDuration validity changed: ${isDurationValid}`);
    console.log(
      `projectApplicationDeadline validity changed: ${isApplicationDeadlineValid}`
    );

    console.log(`Form validity changed: ${isFormValid}`);
  }, [projectName, projectBudget, projectDuration, projectApplicationDeadline]);

  async function handleSubmit(e) {
    e.preventDefault();
    const isoDate = new Date(projectApplicationDeadline).toISOString();
    // const project_detail = { ...form };
    try {
      let response;

      // if we are adding a new record we will POST to /record.
      response = await fetch('http://localhost:5050/createProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName,
          projectDescription,
          projectSkills,
          projectBudget,
          projectApplicationDeadline: isoDate,
          projectDuration,
          projectPublisher: user.id,
          projectLabels: Object.keys(projectLabels).filter(
            (label) => projectLabels[label] === 1
          ),
          // posttime: getBerlinDate(),
          applicants: [], //create an empty array
          chosen_applicants: null,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('New project ID:', data.id);
      navigate(`/projectdetail/publisher/${data.id}`);
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    }
  }
  const handleCheckboxChange = (label) => (event) => {
    setProjectLabels((prevLabels) => ({
      ...prevLabels,
      [label]: event.target.checked ? 1 : 0,
    }));
  };
  const handleDeadlineChange = (date) => {
    const zonedDate = new Date(date);
    setProjectApplicationDeadline(zonedDate);
    const isValid = zonedDate > today;
    setisApplicationDeadlineValid(isValid);
  };

  if (user.role == 'publisher') {
    return (
      <Container
        component="project-create"
        maxWidth="xl"
        sx={{ marginLeft: '15%', marginRight: '15%', marginTop: '50px' }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexWrap: 'wrap' }}
        >
          <Box sx={{ width: '100%', m: 1 }}>
            <Box container spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Box>
                  <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                    Create Project
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box item xs={12}>
                  <TextField
                    fullWidth
                    sx={{ mt: 6, width: '1000px' }}
                    id="project-name"
                    name="project-name"
                    label="Project Name*"
                    type="project_name"
                    variant="outlined"
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                    error={!isProjectNameValid}
                    helperText={
                      !isProjectNameValid &&
                      'please type in the name of your project'
                    }
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box xs={4}>
                  <TextField
                    fullWidth
                    sx={{ mt: 8, width: '1000px' }}
                    id="project-duration"
                    label="Duration (days)*"
                    type="project_duration"
                    variant="outlined"
                    onChange={(e) => setProjectDuration(e.target.value)}
                    value={projectDuration}
                    error={!isDurationValid}
                    helperText={
                      !isDurationValid &&
                      'Duration must be doable within 4 weeks'
                    }
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box xs={4}>
                  <TextField
                    sx={{ mt: 8, width: '1000px' }}
                    id="project-budget"
                    label="Project Budget* Note that a 3% service fee will be added, use point instead of comma"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">€</InputAdornment>
                      ),
                    }}
                    type="project_budget"
                    variant="outlined"
                    onChange={(e) => setProjectBudget(e.target.value)}
                    value={projectBudget}
                    error={!isBudgetValid}
                    helperText={
                      !isBudgetValid && 'Budget must be lower equal 3000 Euro'
                    }
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                  <TextField
                    sx={{ mt: 8, width: '1000px' }}
                    id="project-description"
                    label="Description"
                    multiline
                    rows={4}
                    type="project_description"
                    defaultValue="Please describe your project in detail!"
                    variant="outlined"
                    onChange={(e) => setProjectDescription(e.target.value)}
                    value={projectDescription}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box item xs={12}>
                  <TextField
                    sx={{ mb: 8, mt: 8, width: '1000px' }}
                    id="project-skills-description"
                    label="Skills required"
                    multiline
                    rows={4}
                    type="project_skills"
                    defaultValue="Please describe the skills an applicant should bring! Note: You could also mention skills that are not included in our labels"
                    variant="outlined"
                    onChange={(e) => setProjectSkills(e.target.value)}
                    value={projectSkills}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '1000px', mb: 8, ml: 10 }}>
                <LabelCheckboxList
                  projectLabels={projectLabels}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box xs={4} sx={{ mb: 8 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
                  <DateTimePicker
                    label="Project Deadline*"
                    inputFormat="yyyy/MM/dd HH:mm:ss"
                    minDateTime={today}
                    value={projectApplicationDeadline}
                    onChange={handleDeadlineChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        sx={{ m: 1, width: '100%' }}
                        variant="outlined"
                        error={!isApplicationDeadlineValid}
                        helperText={
                          !isApplicationDeadlineValid
                            ? 'Deadline must be in the future'
                            : ''
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ mb: 8 }}>
                <Button
                  sx={{ m: 1, width: '200px', height: '50px' }}
                  variant="contained"
                  type="submit"
                  disabled={!isFormValid}
                >
                  save and publish
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }
}

function LabelCheckboxList({ projectLabels, handleCheckboxChange }) {
  //alphabetical order
  const labelsArray = Object.keys(projectLabels).sort();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Project Labels (optional)</FormLabel>
      <FormGroup>
        <Grid container spacing={2}>
          {labelsArray.map((label) => (
            <Grid item xs={3} key={label}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={projectLabels[label] === 1}
                    onChange={handleCheckboxChange(label)}
                    name={label}
                  />
                }
                label={label}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </FormControl>
  );
}
