import React from 'react';
interface LandingProps {
  someProp?: any;
}
const Landing: React.FC<LandingProps> = (props) => {
  return <div>Landing Functional Component</div>;
};
export default Landing;
