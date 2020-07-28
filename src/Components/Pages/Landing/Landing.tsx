import React from 'react';
interface LandingProps {
  someProp?: any;
}
const Landing: React.FC<LandingProps> = () => {
  return <div>Landing Functional Component</div>;
};
export default Landing;
