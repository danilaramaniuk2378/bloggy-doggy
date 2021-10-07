output "server-private-ip" {
  value = module.server.private-ip
}

output "server-public-ip" {
  value = aws_eip.server-eip.public_ip
}

output "server-db-address" {
  value = module.server-db.address
}

output "aws-region" {
  value = var.aws-region
}

output "server-deployment-bucket-name" {
  value = module.server-codedeploy.deployment-bucket-name
}

output "server-codedeploy-app-name" {
  value = module.server-codedeploy.app-name
}
