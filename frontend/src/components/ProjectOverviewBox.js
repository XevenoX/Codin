import * as React from 'react';
import { Avatar, Grid, Paper, Typography, Button, Card } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const ProjectOverviewBox = ({ projectInfo }) => {

    return (
        <div className="overview">
            <Card
                elevation={3}
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
                    spacing={1}
                    direction="row"
                    sx={{ height: '100%', alignItems: 'center' }}
                >
                    <Grid
                        item
                        container
                        xs={10}
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
                                            Posted {formatDistanceToNow(new Date(projectInfo.project_posttime), { addSuffix: true })} •&nbsp;
                                            {projectInfo.project_status === 1 && (
                                                <span>
                                                    Close {formatDistanceToNow(new Date(projectInfo.project_deadline), { addSuffix: true })} •&nbsp;
                                                </span>
                                            )}
                                            {projectInfo.project_status === 5 && (
                                                <span>
                                                    Completed {formatDistanceToNow(new Date(projectInfo.project_completetime), { addSuffix: true })} •&nbsp;
                                                </span>
                                            )}
                                            {projectInfo.applicants ? projectInfo.applicants.length : 0} applications received
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
                                    sx={{ fontWeight: 'bold', fontSize: 28 }}
                                >
                                    $ {projectInfo.project_budget}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ height: '30%', overflow: 'hidden' }}>
                            <Typography
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
                            {projectInfo.project_labels && projectInfo.project_labels.length > 0 && projectInfo.project_labels.map((label, index) => (
                                <React.Fragment key={label}>
                                    <Typography
                                        sx={{ fontWeight: 'light', color: 'blue' }}
                                    >
                                        {label}
                                    </Typography>
                                    {index < projectInfo.project_labels.length - 1 && (
                                        <Typography sx={{ fontWeight: 'light' }}>
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
                        xs={2}
                        spacing={1}
                        sx={{ height: '100%' }}
                    >
                        <Grid item sx={{ flexGrow: 1 }}>
                            <Avatar src={projectInfo.avatar} alt="Logo"
                                variant="square"
                                sx={{ width: '120px', height: '80px' }} />
                        </Grid>
                        <Grid item sx={{ flexGrow: 0 }}>
                            <Button variant="contained" size='small' sx={{ width: '120px' }}>
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