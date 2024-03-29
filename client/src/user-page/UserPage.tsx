import React from 'react';
import { useByeQuery } from '../generated/graphql';

const UserPage = () => {
  const { data, loading, error } = useByeQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return <div>{data.bye}</div>;
};

export default UserPage;
