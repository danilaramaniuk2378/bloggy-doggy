import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatPreview from './components/flat-preview/FlatPreview';
import Map from '~/common/components/map/Map';
import FlatModel from '~/common/models/lokka/FlatModel';
import './style.less';

class Main extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      flats: [],
    };
  }

  componentDidMount = async () => {
    const { allFlats } = await FlatModel.getAllFlats();
    this.setState({ flats: allFlats });
  }

  render() {
    const { flats } = this.state;
    const { history } = this.props;

    return (
      <div className="Main">
        <div className="Main__searcPanel">Main__searcPanel</div>
        <div className="Main__content">
          <div className="Main__content__left">
            {
              flats.map(item => <FlatPreview history={history} key={item._id} flat={item} />)
            }
          </div>
          <div className="Main__content__right">
            <Map flats={flats} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
