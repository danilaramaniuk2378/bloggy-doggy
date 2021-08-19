import React from 'react';
import { useHelloQuery } from '../generated/graphql';

const Dashboard = () => {
  const { loading, error, data } = useHelloQuery({
    fetchPolicy: 'network-only',
  });

  if (loading || !data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <>
      <div>{data.hello}</div>
      <div>
        {data.users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
