import React from 'react';
import renderer from 'react-test-renderer';
import FlatPreview from '../FlatPreview';

const flat = {
  _id: '57a459a18e126011006e10d7',
  photoUrls: [
    'https://flatbel.s3.amazonaws.com/1470388637305_20160607_180802-1024x1820.jpg',
  ],
  price: 25,
  address: {
    latitude: '53.8622209',
    longitude: '27.46885659999998',
  },
};

const history = {
  push: () => {},
};

describe('FlatPreview component', () => {
  it('renders default layout', () => {
    const renderedComponent = renderer.create(<FlatPreview flat={flat} history={history} />);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
    renderedComponent.unmount();
  });
});
