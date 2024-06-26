import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Paper, Typography, Button, Card } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
}));

const ProjectOverviewBox = ({ projectInfo }) => {
    const postedDaysAgo = 1;
    const closeInDays = 1;
    const applicationsReceived = 1;

    return (
        <div className="overview">
            <Card
                elevation={6}
                sx={{
                    p: 2,
                    margin: 1,
                    // width: 1000,
                    // height: 175,
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    sx={{ height: '100%', alignItems: 'center' }}
                >
                    <Grid
                        item
                        container
                        xs={9}
                        direction="column"
                        justifyContent="space-around"
                        alignItems="stretch"
                    >
                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item xs>
                                <Grid container direction="column" className="task-info">
                                    <Grid item>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: 10,
                                                fontWeight: 'light',
                                                margin: 0.3,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            Posted {Math.floor((new Date() - new Date(projectInfo.project_posttime)) / (1000 * 60 * 60 * 24))} days ago •
                                            Close in {Math.floor((new Date(projectInfo.project_deadline) - new Date()) / (1000 * 60 * 60 * 24))}
                                            days • {projectInfo.applicants ? projectInfo.applicants.length : 0} applications received
                                        </Typography>
                                    </Grid>
                                    <Grid item className="task-title">
                                        <Typography
                                            sx={{
                                                fontSize: 18,
                                                fontWeight: 'bold',
                                                margin: 0.3,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {projectInfo.project_name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={3}
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 'bold', fontSize: 28 }}
                                >
                                    $ {projectInfo.project_budget}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ height: '30%', overflow: 'hidden' }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    margin: 0.5,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {projectInfo.project_description}
                            </Typography>
                        </Grid>

                        <Grid sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', height: '15%', margin: 0.5 }}>
                            {projectInfo.project_labels.map((label, index) => (
                                <React.Fragment key={label}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 'light', color: 'blue' }}
                                    >
                                        {label}
                                    </Typography>
                                    {index < projectInfo.project_labels.length - 1 && (
                                        <Typography variant="body2" sx={{ fontWeight: 'light' }}>
                                            &middot;
                                        </Typography>
                                    )}
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="column"
                        xs={3}
                        spacing={3}
                        sx={{ height: '100%' }}
                    >
                        <Grid item sx={{ flexGrow: 1 }}>
                            <Paper sx={{ height: '100%' }}>
                                <Typography>Avatar</Typography>
                            </Paper>
                        </Grid>
                        <Grid item sx={{ flexGrow: 0 }}>
                            <Button variant="contained" fullWidth>
                                See More
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div >
    );
};

export default ProjectOverviewBox;