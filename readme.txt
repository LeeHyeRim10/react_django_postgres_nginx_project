docker build -t my-jenkins .

// 윈도우용
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home my-jenkins


// 리눅스용
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  my-jenkins



  /** jenkis 캐시 제거 명령어*/
  docker rmi my-jenkins
  docker build --no-cache -t my-jenkins .
  docker rm -f jenkins

  docker rmi -f my-jenkins

  docker volume rm jenkins_home

  docker builder prune -af

  docker system prune -af

1.  docker build --no-cache -t my-jenkins .

2.  docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --restart unless-stopped my-jenkins

3.  docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword