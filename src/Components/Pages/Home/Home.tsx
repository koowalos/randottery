import React from 'react';
interface HomeProps {
  someProp?: any;
}
const Home: React.FC<HomeProps> = (props) => {
  return <div>Home Functional Component</div>;
};
export default Home;
