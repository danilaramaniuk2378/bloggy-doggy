import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from '@material-ui/core/Button';

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
    <div key={flat.price}>
      {flat.price}
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  ));
};

export default Dashboard;
