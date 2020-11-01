Here is my Twitter app for code review, and a few notes/questions in descending importance...

1 - I cannot solve the mystery of the double media post. Whenever I try to replace the tweet's media_url, it still ends up there. And thus two media_urls render - one a beautifully aligned link, the other a gross, useless blight of text. I've tried everything - editing 'full_text' directly, deleting all the various instances of media and media_url that exist in the data. If anyone can figure this out, I'd love to hear it.
2 - I have a "tweets not found" message banner that won't wait for tweets to be done loading. Instead, if a search comes back empty, all banners disappear. I figure this indicates something wrong with the lifecycle of how I fetch my data...
3 - Hashtag replacement is not 100% consistent.
4 - I want to put shadow boxes on the cards, but cannot get them to show.

That's it! Otherwise, enjoy!

// what should I put in README so the visitor knows to add .env file? and any other necessaries?

Utilizes React, Node.js, Express, Bootstrap. Server fetches from the Twitter API and serves them to the client without the use of any Twitter libraries.
Wrote parsers to display active links to hashtags, user mentions, urls and media.

.env file will be needed to connect with Twitter's API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
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

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
