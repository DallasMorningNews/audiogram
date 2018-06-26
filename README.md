# dmn-audiogram (🔊 -> 🎥)

Audiogram is a library for generating shareable videos from audio clips.

## What's in here

This is our fork of New York Public Radio's audiogram tool, with our tweaks to add some custom styles and get it running on Heroku. See [the original repo](https://github.com/nypublicradio/audiogram) for requirements, information about theme creation, etc.

## Local development

Because this requires an older version of Node.js, the Docker option is the easiest to work with for making simple theme tweaks. See the [original README](https://github.com/nypublicradio/audiogram) for additional setup options.

1. Create a .env file with credentials for Google Oauth, using the [.env.example](.env.example) file as a starting point.

1. Once you've installed Docker, build and run audiogram in a local Docker instance using:

```sh
$ docker run -v $(pwd):/home/audiogram/audiogram -p 8888:8888 -t -i audiogram
```

2. Once you're in the Docker instance, you can install dependencies and run the server:

```sh
$ npm install
$ npm start
```

Audiogram should be accessible at [localhost:8888](http://localhost:8888/)

## Deploying

Audiogram runs on Heroku. Every `git push` to the `master` branch will be deployed by Heroku.

## License

See [LICENSE.md](LICENSE.md)
