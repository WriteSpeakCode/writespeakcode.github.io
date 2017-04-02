SHELL=/bin/bash

default: build

build:
	-rm -fr build/
	docker build -t wsc .
	docker run \
  	-v `pwd`:/srv/middleman \
		-v /etc/localtime:/etc/localtime \
  	wsc \
  	bundle exec rake build

serve: build
	-docker ps --filter="name=middleman" -aq | xargs -n1 docker rm -f
	docker run -d --name middleman \
  	--volume=`pwd`:/srv/middleman \
  	--publish 4567:4567 \
  	wsc \
  	bundle exec middleman server --verbose
	( docker logs -f middleman & ) | grep -q "start"
	sleep 3
	open http://0.0.0.0:4567

_deploy:
	git clone --branch master `git remote get-url upstream` _deploy

deploy: build _deploy
	cd _deploy && \
		git fetch origin && \
		git checkout master && \
		git reset --hard origin/master && \
		git clean -xdf
	rsync -a --delete --exclude .git --exclude talk build/ _deploy/
	cd _deploy && git add -A && git commit -m "Site updated to `git log --pretty='%h' -n1`" && git push

.PHONY: build serve deploy
