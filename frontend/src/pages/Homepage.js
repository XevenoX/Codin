import React from 'react';
import { makeStyles } from '@mui/styles';
import SignIn from '../components/SignIn';
import TagsScroll from '../components/homepage/TagsScroll';
import homepageThemeImage from '../pics/Homepage-Theme.jpg'; // 引入背景图片

const useStyles = makeStyles((theme) => ({
  backgroundContainer: {
    backgroundImage: `url(${homepageThemeImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '60vh', // 你可以根据需要调整高度
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homepage: {
    textAlign: 'center',
  },
}));

const Homepage = ({ onLogin }) => {
  const classes = useStyles();

  return (
    <div className={classes.homepage}>
      <div className={classes.backgroundContainer}>
        <SignIn onLogin={onLogin} />
      </div>
      <TagsScroll />
    </div>
  );
};

export default Homepage;
