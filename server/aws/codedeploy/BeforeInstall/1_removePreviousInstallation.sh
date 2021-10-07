
#!/bin/sh

deployment_dir=/opt/bloggy-doggy/server
if [ -d "$deployment_dir" ] && [ -x "$deployment_dir" ]; then
  cd /opt/bloggy-doggy/server

  rm -rf *
fi
