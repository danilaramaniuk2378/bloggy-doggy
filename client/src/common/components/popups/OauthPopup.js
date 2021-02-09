import React from 'react';
import PropTypes from 'prop-types';

export default class OauthPopup extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    width: 500,
    height: 500,
    url: '',
    title: '',
  };

  constructor() {
    super();

    this.externalWindow = null;
    this.codeCheck = null;
  }


  componentWillUnmount() {
    if (this.externalWindow) {
      clearInterval(this.codeCheck);
      this.externalWindow.close();
    }
  }

  createPopup = () => {
    const {
      url,
      title,
      width,
      height,
    } = this.props;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    this.externalWindow = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`,
    );
  };

  render() {
    return <span onClick={this.createPopup}> {this.props.children} </span>;
  }
}
