import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import ApplicantsList from '../components/ApplicantsList';
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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import EuroIcon from '@mui/icons-material/Euro';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { CircularProgress, Modal, FormGroup, FormLabel } from '@mui/material';
import { format } from 'date-fns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { de } from 'date-fns/locale';

const initialLabels = {
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
};

export default function ProjectDetailPublisher() {
  //Todo: replace by session subscription
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const { id } = useParams(); //get project id
  const navigate = useNavigate();

  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isProjectNameValid, setIsProjectNameValid] = useState(true);
  const [isBudgetValid, setIsBudgetValid] = useState(true);
  const [isDurationValid, setIsDurationValid] = useState(true);
  const [isApplicationDeadlineValid, setisApplicationDeadlineValid] =
    useState(true);
  const [editLabels, setEditLabels] = useState({});

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5050/getProject/publisher/${id}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        setProjectDetails(data);
        if (data.project_status != 1 || user.role != 'publisher') {
          navigate(`/projectdetail/developer/${data._id}`);
        }
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleEditClick = (field, value) => {
    setEditField(field);

    if (field === 'project_labels') {
      const labelsObj = projectDetails.project_labels.reduce((acc, label) => {
        acc[label] = true;
        return acc;
      }, {});
      setEditLabels(labelsObj);
    } else {
      setEditValue(value);
    }
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditField('');
    setEditValue('');
    setEditLabels({});
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
    if (editField === 'project_name') {
      setIsProjectNameValid(e.target.value !== '');
    }
    if (editField === 'project_budget') {
      setIsBudgetValid(
        !isNaN(e.target.value) &&
          e.target.value !== '' &&
          Number(e.target.value) > 0
      );
    }
    if (editField === 'project_duration') {
      setIsDurationValid(
        !isNaN(e.target.value) &&
          e.target.value !== '' &&
          Number.isInteger(Number(e.target.value)) &&
          Number(e.target.value) > 0 &&
          Number(e.target.value) <= 28
      );
    }
  };

  const handleDateChange = (date) => {
    setEditValue(date);
  };

  const handleCheckboxChange = (label) => (event) => {
    setEditLabels((prevLabels) => ({
      ...prevLabels,
      [label]: event.target.checked,
    }));
  };

  const handleSubmit = async () => {
    if (editField === 'project_name' && !isProjectNameValid) {
      setErrorMessage('project name cannot be empty');
      return;
    }
    if (editField === 'project_budget' && !isBudgetValid) {
      setErrorMessage('Duration must be greater than 0');
      return;
    }
    if (editField === 'project_duration' && !isDurationValid) {
      setErrorMessage('Duration must be doable within 4 weeks');
      return;
    }
    let updatedAttribute = {};
    if (editField === 'project_labels') {
      updatedAttribute = {
        project_labels: Object.keys(editLabels).filter(
          (label) => editLabels[label]
        ),
      };
    } else {
      updatedAttribute = {
        [editField]:
          editField === 'project_deadline'
            ? editValue.toISOString()
            : editValue,
      };
    }
    console.log(updatedAttribute);

    try {
      const response = await fetch(
        `http://localhost:5050/updateProject/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAttribute),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const data = await response.json();
      setProjectDetails(data);
      handleModalClose();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!projectDetails) {
    return <Typography>No project details found</Typography>;
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 8 }}>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2}>
                <ButtonBase
                  onClick={() =>
                    handleEditClick('project_name', projectDetails.project_name)
                  }
                >
                  <Typography color="grey">[edit]</Typography>
                </ButtonBase>
                <Grid>
                  <BusinessIcon color="primary" />
                </Grid>
                <Typography noWrap variant="h5">
                  <Box component="span" fontWeight="fontWeightBold">
                    Project Name:
                  </Box>{' '}
                  {projectDetails.project_name}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <ButtonBase
                  onClick={() =>
                    handleEditClick(
                      'project_duration',
                      projectDetails.project_duration
                    )
                  }
                >
                  <Typography color="grey">[edit]</Typography>
                </ButtonBase>
                <Grid>
                  <AccessTimeIcon color="primary" />
                </Grid>
                <Typography noWrap variant="h5">
                  <Box component="span" fontWeight="fontWeightBold">
                    Duration:
                  </Box>{' '}
                  {projectDetails.project_duration}
                  {' Days'}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <ButtonBase
                  onClick={() =>
                    handleEditClick(
                      'project_deadline',
                      projectDetails.project_deadline
                    )
                  }
                >
                  <Typography color="grey">[edit]</Typography>
                </ButtonBase>
                <Grid>
                  <HourglassTopIcon color="primary" />
                </Grid>
                <Typography noWrap variant="h5">
                  <Box component="span" fontWeight="fontWeightBold">
                    Finish before:{' '}
                  </Box>{' '}
                  {format(
                    new Date(projectDetails.project_deadline),
                    'dd/MM/yyyy HH:mm:ss'
                  )}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <ButtonBase
                  onClick={() =>
                    handleEditClick(
                      'project_budget',
                      projectDetails.project_budget
                    )
                  }
                >
                  <Typography color="grey">[edit]</Typography>
                </ButtonBase>
                <Grid>
                  <EuroIcon color="primary" />
                </Grid>
                <Typography noWrap variant="h5">
                  <Box component="span" fontWeight="fontWeightBold">
                    Budget:{' '}
                  </Box>{' '}
                  {projectDetails.project_budget} Euro
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <ButtonBase
                  onClick={() =>
                    handleEditClick(
                      'project_labels',
                      projectDetails.project_labels
                    )
                  }
                >
                  <Typography color="grey">[edit]</Typography>
                </ButtonBase>
                <Grid>
                  <BookmarkIcon color="primary" />
                </Grid>
                <Typography noWrap variant="h5">
                  <Box component="span" fontWeight="fontWeightBold">
                    Labels:{' '}
                  </Box>{' '}
                  {Object.values(projectDetails.project_labels).join(', ')}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 8 }}>
          <Box>
            <ApplicantsList
              data={projectDetails.applicants}
              budget={projectDetails.project_budget}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 8 }}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <ButtonBase
                onClick={() =>
                  handleEditClick(
                    'project_description',
                    projectDetails.project_description
                  )
                }
              >
                <Typography color="grey">[edit]</Typography>
              </ButtonBase>
              <Typography noWrap variant="h5" sx={{ fontWeight: 'bold' }}>
                Description
              </Typography>
            </Stack>
            <Typography variant="h6">
              {projectDetails.project_description}
            </Typography>

            <Stack direction="row" spacing={2}>
              <ButtonBase
                onClick={() =>
                  handleEditClick(
                    'project_skills',
                    projectDetails.project_skills
                  )
                }
              >
                <Typography color="grey">[edit]</Typography>
              </ButtonBase>
              <Typography noWrap variant="h5" sx={{ fontWeight: 'bold' }}>
                Skills
              </Typography>
            </Stack>
            <Typography variant="h6">
              {projectDetails.project_skills}
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Modal open={isModalOpen} onClose={handleModalClose}>
            <Box sx={{ ...modalStyle }}>
              <Typography variant="h6" component="h2">
                Edit {editField.replace('_', ' ')}
              </Typography>
              {editField === 'project_deadline' ? (
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
                  <DateTimePicker
                    label="Application Deadline*"
                    inputFormat="yyyy/MM/dd HH:mm:ss"
                    minDateTime={new Date()}
                    value={editValue}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                        variant="outlined"
                        error={!!errorMessage}
                        helperText={errorMessage}
                      />
                    )}
                  />
                </LocalizationProvider>
              ) : editField === 'project_labels' ? (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select Labels</FormLabel>
                  <FormGroup>
                    <Grid container spacing={2}>
                      {Object.keys(initialLabels)
                        .sort()
                        .map((label) => (
                          <Grid item xs={3} key={label}>
                            <FormControlLabel
                              key={label}
                              control={
                                <Checkbox
                                  checked={editLabels[label] || false}
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
              ) : (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editValue}
                  onChange={handleInputChange}
                  sx={{ mt: 2, mb: 2 }}
                  error={!!errorMessage}
                  helperText={errorMessage}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
