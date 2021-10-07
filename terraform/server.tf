resource "aws_eip" "server-eip" {
  instance = module.server.instance-id
}

module "server" {
  source = "./node-server"

  ami-id               = "ami-07df274a488ca9195"
  iam-instance-profile = module.server-codedeploy.iam-instance-profile
  key-pair             = aws_key_pair.bloggy-doggy-key.key_name
  name                 = "server"
  subnet-id            = aws_subnet.bloggy-doggy-subnet-public.id
  vpc-security-group-ids = [
    aws_security_group.allow-http.id,
    aws_security_group.allow-ssh.id,
    aws_security_group.allow-all-outbound.id
  ]
}

module "server-db" {
  source = "./postgres-db"

  apply-immediately    = true
  db-name              = "serverBloggyDoggyDB"
  db-subnet-group-name = aws_db_subnet_group.private.id
  identifier           = "server-db"
  password             = var.server-db-password
  publicly-accessible  = false
  username             = var.server-db-username
  vpc-security-group-ids = [
    aws_security_group.allow-internal-postgresql.id
  ]
}

module "server-codedeploy" {
  source = "./codedeploy-app"

  app-name          = "server"
  ec2-instance-name = module.server.name
}
