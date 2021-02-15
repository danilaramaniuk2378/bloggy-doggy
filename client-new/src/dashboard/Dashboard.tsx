import React from 'react';
import { useQuery, gql } from '@apollo/client';

import styles from './Dashboard.module.scss';

const GET_FLATS = gql`
  query {
    getFlats {
      _id
      price
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_FLATS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  // @ts-ignore: add type TODO
  return data.getFlats.map((flat) => (
    <div className={styles.item} key={flat.price}>
      {flat.price}
    </div>
  ));
};

export default Dashboard;
