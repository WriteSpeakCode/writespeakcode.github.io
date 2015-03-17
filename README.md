# writespeakcode.com

## Installation

### Requirements

- Ruby
- Bundler `gem install bundler`
- [Node.js](http://nodejs.org/)
- npm
- [Bower](http://bower.io/)

If Ruby and homebrew are already installed:

```bash
> gem install bundler
> brew install node
> brew install npm
> npm install -g bower
```

### Install dependencies

```bash
> bundle install
> bower install
```

### Launch the server

```bash
> bundle exec middleman
```

Visit [http://localhost:4567/](http://localhost:4567/)

## Create a pull request

- Create changes on a feature branch
- Submit a pull request to the `dev` branch
- Ping [Rebecca](@rmw) or [Rachel](@rachelober)

## Publish

To publish changes (in the `dev` branch) to Github Pages, run:

```bash
> bundle exec rake publish
```

If you are developing off of your own fork, run:

```bash
> bundle exec rake publish REMOTE_NAME=upstream
```

## Contributing

Please take a look at our [contributing](CONTRIBUTE.md) guidelines. We have volunteers who work on our website to make sure it is up-to-date for all of our events. You are welcome to work on it too if you have free time!

## License

The code is available under the [MIT license](MIT-LICENSE).
