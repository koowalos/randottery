import React from 'react';
import { useParams } from 'react-router-dom';
interface JoinDetailsProps {
  someProp?: any;
}
const JoinDetails: React.FC<JoinDetailsProps> = (props) => {
  let { id } = useParams();
  return <div>Join {id} Functional Component</div>;
};
export default JoinDetails;
