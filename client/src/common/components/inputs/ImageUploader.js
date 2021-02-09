import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import AWSModel from '~/common/models/lokka/AWSModel';
import axios from 'axios';
import { v4 } from 'uuid';

class ImageUploader extends PureComponent {
  static propTypes = {
    setPhotoUrls: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      photoUrls: [],
    };
  }

  onDrop = async (files) => {
    const { setPhotoUrls } = this.props;
    const photoUrls = await this.getPhotoURLs(files);
    this.setState({ photoUrls });
    setPhotoUrls(photoUrls);
  }

  getPhotoURLs = async (files) => {
    return Promise.all(files.map(async (file) => {
      const { signS3 } = await AWSModel.s3Sign({
        filename: v4(),
        filetype: 'image/jpeg, image/png',
      });

      await this.sendRequestToS3(file, signS3.signedRequest);

      return signS3.url;
    }));
  }

  sendRequestToS3 = (file, signedRequest) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    return axios.put(signedRequest, file, options);
  };

  render() {
    const { photoUrls } = this.state;
    return (
      <div>
        <Dropzone
          accept="image/jpeg, image/png"
          onDrop={this.onDrop}
        >
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        {
          photoUrls.map(url => (
            <img
              alt="sorry"
              src={url}
              key={url}
              style={{ width: 50, height: 50 }}
            />
          ))
        }
      </div>
    );
  }
}

export default ImageUploader;
