# Github Issues

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with Typescript template.

## Before first run

For unauthenticated users, github has limitations (10 requests per minute for searching API and 60 request per minute for fetching users by login). To increase this limit to 30 (from 10) and 5000 (from 60) you need to:

- Create .env file from env.example file in root directory
- Fill both envs variables, you can generate your token here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

## What could be improved?

Requests to github API should be made on server to avoid exposing personal access token in Network tab

## How to run?

Developed and tested with:

### `Node v16.14.2 and Npm 8.5.0`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
