resource "aws_s3_bucket" "deploy-bucket" {
  bucket = "bloggy-doggy-${var.app-name}-deployment"
}
