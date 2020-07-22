import React, { createContext, useState, useEffect, useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';
import { UserContext } from './UserProvider';

export const LotteryContext = createContext({
  error: undefined,
  loading: false,
  lotteries: null,
});

const LotteryProvider: React.FC = (props) => {
  const userData: any = useContext(UserContext);
  const { user } = userData;

  const [lotteriesData, setLotteries] = useState<any>({
    error: undefined,
    loading: false,
    lotteries: null,
  });

  const [ownerLotteries, ownerLoading, ownerError] = useCollection(
    firestore.collection('lotteries').where('owner', '==', user?.uid ?? 'null')
  );

  const [joinedLotteries, joinedLoading, joinedError] = useCollection(
    firestore
      .collection('lotteries')
      .where('participants', 'array-contains', user?.uid ?? 'null')
  );

  useEffect(() => {
    let data: any = [];

    if (ownerLotteries && joinedLotteries) {
      ownerLotteries.docs.forEach((doc) => {
        data.push({ ...doc.data(), key: doc.id, id: doc.id });
      });
      joinedLotteries.docs.forEach((doc) => {
        data.push({ ...doc.data(), key: doc.id, id: doc.id });
      });
    }

    setLotteries({
      lotteries: data,
      loading: joinedLoading || ownerLoading,
      error: joinedError || ownerError,
    });
  }, [
    joinedError,
    joinedLoading,
    joinedLotteries,
    ownerError,
    ownerLoading,
    ownerLotteries,
    user,
  ]);

  return (
    <LotteryContext.Provider value={lotteriesData}>
      {props.children}
    </LotteryContext.Provider>
  );
};

export default LotteryProvider;
