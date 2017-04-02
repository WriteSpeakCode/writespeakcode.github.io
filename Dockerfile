FROM ruby:2.3.1

COPY Gemfile /tmp
COPY Gemfile.lock /tmp
RUN cd /tmp && bundle install --jobs 3 --retry 3

RUN apt-get update && apt-get install -y node

WORKDIR /srv/middleman
