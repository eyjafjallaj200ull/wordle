A simple Wordle app made with create-react-app

A json file stores words that are fetched in the app and a random word gets assigned as the solution. The user can make 6 attempts to find the solution. 

On PC, the letters can be entered in each box either with the user’s keyboard or by clicking on the letters present on the app’s keypad interface. On mobile, users can only use the app’s keypad.

The app’s design is minimal and responsive. While dark mode is pre-selected, the user can also choose the light mode if they prefer, and toggle between modes. 

Main branch contains the initial code of the app. The json file for the word is in a separate data folder, meant for use with json-server. Json-server can’t be used with Github Pages as far as I know, and I wanted to deploy this personal project cost-free. So I created another branch, build, and moved the db.json to the public folder.

In accordance with create-react-app documentation, I used the npm package gh-pages to build and deploy the app from the build branch. Which then created the gh-pages branch, that is used to make the Github Pages website.
