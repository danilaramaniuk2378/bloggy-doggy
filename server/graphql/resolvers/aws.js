// TODO: via express
import aws from 'aws-sdk';
import config from '../../config';

aws.config.update({
  accessKeyId: config.AWS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_KEY,
  region: 'eu-central-1',
});

export const signS3 = async (parent, {
    filename,
    filetype,
  }) => {
  const s3 = new aws.S3({
    signatureVersion: 'v4',
  });

  const s3Params = {
    Bucket: config.AWS_S3_BUCKET,
    Key: filename,
    Expires: 60,
    ContentType: filetype,
    ACL: 'public-read',
  };

  const signedRequest = await s3.getSignedUrl('putObject', s3Params);
  const url = `https://${config.AWS_S3_BUCKET}.s3.amazonaws.com/${filename}`;

  return {
    signedRequest,
    url,
  };
};
