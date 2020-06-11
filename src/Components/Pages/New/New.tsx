import React from 'react';
interface NewProps {
  someProp?: any;
}
const New: React.FC<NewProps> = (props) => {
  return <div>New Functional Component</div>;
};
export default New;
