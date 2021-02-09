import client from './client';

export default class AWSModel {
  static s3Sign({ filename, filetype }) {
    return client().mutate(`
        {
          signS3(filename: "${filename}", filetype: "${filetype}"){
            signedRequest,
            url
          }
        }
    `);
  }
}
