resource "aws_s3_bucket" "client" {
  bucket = "bloggy-doggy-client"
  acl    = "public-read"
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject","s3:GetObjectVersion"],
      "Resource": ["arn:aws:s3:::bloggy-doggy-client/*"]
    }
  ]
}
POLICY

  website {
    index_document = "index.html"
  }
}
