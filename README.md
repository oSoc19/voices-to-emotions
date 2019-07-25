# Voices To Emotions

This repository is one of the three repositories used for the voices-to-emotions project. You can find more information about this project [here](https://osoc19.github.io/voices-to-emotions/).

This repository containing the backend for the Voices To Emotions project.

You can find the other repositories here:
* https://github.com/oSoc19/voices-to-emotions
* https://github.com/oSoc19/voices-to-emotions-audio-api
* https://github.com/oSoc19/voices-to-emotions-ai

# Instruction
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

# Functions

## Internal Functions

/api/dataentries (Zeit) [GET]: An HTTP endpoint that returns all raw data entries saved in the database.

/api/graphs (Zeit) [GET]: An HTTP endpoint that reads the data entries and creates graph data of the last 10 calls. This function takes in a `user_id` query parameter.

/api/leave (Zeit) [GET]: An HTTP endpoint that calculates and returns the likeliness to leave score for a certain employee. This function takes in a `user_id` query parameter.

/api/reset (Zeit) [GET]: An HTTP endpoint that resets the data for a certain user. This function takes in a `user_id` query parameter.

/api/user (Zeit) [GET]: An HTTP endpoint that returns the user’s data. This function has an optional `user_id` query parameter, if this query parameter is not provided it will return all users.
