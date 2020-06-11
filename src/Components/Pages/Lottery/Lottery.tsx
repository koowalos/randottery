import React from 'react';
import { useParams } from 'react-router-dom';
interface LotteryProps {
  someProp?: any;
}
const Lottery: React.FC<LotteryProps> = (props) => {
  let { id } = useParams();
  return <div>Lottery for {id} Functional Component</div>;
};
export default Lottery;
