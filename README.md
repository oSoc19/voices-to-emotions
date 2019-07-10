# Voices To Emotions

## Running dev environment

This project uses Now to run the dev environment automagically.

### Setup environment

You do need to setup the environment variables in a .env file.

So create a `.env` file in the same directory as this file which contains the following:

```shell
MONGODB_CONN_STRING=mongodb+srv://<insert connection string>
```

## Starting the dev environment

Run `npm start` or `yarn start` in this directory.
This should start up the dev server of now, running all API's and frontend all at once.
