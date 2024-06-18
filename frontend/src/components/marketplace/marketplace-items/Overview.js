import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
}));

const Overview = () => {
  const postedDaysAgo = 1;
  const closeInDays = 1;
  const applicationsReceived = 1;

  return (
    <div className="overview">
      <Card
        elevation="6"
        sx={{
          p: 2,
          margin: 1,
          width: 675,
          height: 200,
          flexGrow: 1,
          display: 'flex', // 使用 flex 布局
          alignItems: 'center', // 垂直居中
          justifyContent: 'center', // 水平居中
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
                      Posted {postedDaysAgo} days ago • Close in {closeInDays}{' '}
                      days • {applicationsReceived} applications received.
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
                      Framer Design Mobile Responsiveness Specialist Specialist
                      Specialist Specialist
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
                  $ 108
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                accusamus nemo repellendus, sapiente voluptatibus numquam quod
                fugiat soluta quae doloremque perferendis aut placeat neque
                nihil aliquid ducimus cum maiores culpa.
              </Typography>
            </Grid>
            <Grid item sx={{ height: '15%', margin: 0.5 }}>
              <Typography
                variant="body2"
                xs={{
                  fontWeight: 'light',
                }}
              >
                Tag1 • Tag2 • Tag3 • Tag4 • Tag5
              </Typography>
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
    </div>
  );
};

export default Overview;
