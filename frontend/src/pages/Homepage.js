import React from 'react';
import SignIn from '../components/SignIn';
import TagsScroll from '../components/homepage/TagsScroll';

const Homepage = ({ onLogin }) => {
  return (
    <div className="homepage">
      <SignIn onLogin={onLogin} />
      <TagsScroll />
    </div>
  );
};

export default Homepage;
