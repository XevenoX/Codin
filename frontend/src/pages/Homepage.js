import React from 'react';
import SignIn from '../components/SignIn';
import TagsScroll from '../components/homepage/TagsScroll';

const Homepage = () => {
  return (
    <div className="homepage">
      <SignIn />
      <TagsScroll />
    </div>
  );
};

export default Homepage;
