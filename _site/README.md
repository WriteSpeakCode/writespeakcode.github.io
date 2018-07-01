# writespeakcode.com

### Getting started

This is a Jekyll site. Please find notes below for running the site.

Clone the repo
```
git clone https://github.com/WriteSpeakCode/writespeakcode.github.io.git
```

Install the gems
```
bundle install
```

Run the dev server
```
jekyll serve
```

Build the production code
```
jekyll build
```


#### Dev server
When running the dev server, you'll be able to make changes to the markup and styling, reload the page, and see your changes. While the dev server is running, it will update your built files with your new markup and styling. However, changes to data files or `_config.yml` require stopping and restarting the dev server.

#### Organization
Each section on the site has it's own file within `_includes`. This allows for maximum reuse and minimal editing. They are then included within the various layouts or pages within the site.

We've started transitioning our previous css to small scss files that are imported in custom_2018.scss. Some of these new files have been completed converted to sass and use our site variables while others are still plain old css and could be made sass-y.

## Contributing

We're in the middle of a re-write and this is our temporary site.

We have volunteers who work on our website to make sure it is up-to-date for all of our events. You are welcome to work on it too! Please take a look at our [contributing](CONTRIBUTE.md) guidelines.

## License

The code is available under the [MIT license](LICENSE).
