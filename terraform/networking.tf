resource "aws_db_subnet_group" "private" {
  name       = "bloggy-doggy-db-subnet-group-private"
  subnet_ids = [aws_subnet.bloggy-doggy-subnet-private-1.id, aws_subnet.bloggy-doggy-subnet-private-2.id]

  tags = {
    Name = "Private DB Subnet Group"
  }
}

resource "aws_internet_gateway" "bloggy-doggy" {
  vpc_id = aws_vpc.bloggy-doggy.id
}

resource "aws_route_table" "allow-outgoing-access" {
  vpc_id = aws_vpc.bloggy-doggy.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.bloggy-doggy.id
  }

  tags = {
    Name = "Route Table Allowing Outgoing Access"
  }
}

resource "aws_route_table_association" "bloggy-doggy-subnet-public" {
  subnet_id      = aws_subnet.bloggy-doggy-subnet-public.id
  route_table_id = aws_route_table.allow-outgoing-access.id
}

resource "aws_route_table_association" "bloggy-doggy-subnet-private-1" {
  subnet_id      = aws_subnet.bloggy-doggy-subnet-private-1.id
  route_table_id = aws_route_table.allow-outgoing-access.id
}

resource "aws_security_group" "allow-http" {
  name        = "allow-http"
  description = "Allow HTTP inbound traffic"
  vpc_id      = aws_vpc.bloggy-doggy.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow-ssh" {
  name        = "allow-ssh"
  description = "Allow SSH inbound traffic"
  vpc_id      = aws_vpc.bloggy-doggy.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow-all-outbound" {
  name        = "allow-all-outbound"
  description = "Allow all outbound traffic"
  vpc_id      = aws_vpc.bloggy-doggy.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow-internal-http" {
  name        = "allow-internal-http"
  description = "Allow internal HTTP requests"
  vpc_id      = aws_vpc.bloggy-doggy.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.bloggy-doggy.cidr_block]
  }
}

resource "aws_security_group" "allow-internal-postgresql" {
  name        = "allow-internal-postgresql"
  description = "Allow internal Postgresql requests"
  vpc_id      = aws_vpc.bloggy-doggy.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.bloggy-doggy.cidr_block]
  }
}

resource "aws_subnet" "bloggy-doggy-subnet-public" {
  availability_zone = "eu-central-1a"
  cidr_block        = "10.0.0.0/24"
  vpc_id            = aws_vpc.bloggy-doggy.id

  tags = {
    Name = "Bloggy Doggy Subnet (Public)"
  }
}

resource "aws_subnet" "bloggy-doggy-subnet-private-1" {
  availability_zone = "eu-central-1a"
  cidr_block        = "10.0.1.0/24"
  vpc_id            = aws_vpc.bloggy-doggy.id

  tags = {
    Name = "Bloggy Doggy Subnet (Private 1)"
  }
}

resource "aws_subnet" "bloggy-doggy-subnet-private-2" {
  availability_zone = "eu-central-1b"
  cidr_block        = "10.0.2.0/24"
  vpc_id            = aws_vpc.bloggy-doggy.id

  tags = {
    Name = "Bloggy Doggy Subnet (Private 2)"
  }
}

resource "aws_vpc" "bloggy-doggy" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "Bloggy Doggy VPC"
  }
}
