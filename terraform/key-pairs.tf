resource "aws_key_pair" "bloggy-doggy-key" {
  key_name   = "bloggy-doggy-key"
  public_key = file("./bloggy_doggy.pem")
}