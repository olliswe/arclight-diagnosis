# Arclight Diagnosis Tool

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

This web app allows doctors to view screenings submitted via the Arclight Smartphone app. The doctors can submit a diagnosis to the screening, which is then send to the end-user on the smartphone app.

## Running Locally

1. Clone the repository
2. Install dependencies using `yarn install`
3. Start the local dev server on localhost:3000 by running `yarn start`


## Project Structure

`/patches`
Packages repaired using [patch-package](https://www.npmjs.com/package/patch-package)

`/public`
Contains the index.html file and other public assets

`/src`
Top level React directory

`/src/pages`
All pages rendered by react-router are here

`/src/components`
All React components rendered within pages are here

`/src/context`
All flux stores are kept here, created with React Context api


## Deployment
This project uses Firebase CLI to deploy new changes to Firebase. Ensure that you have the Firebase CLI installed, and that you have the login details for the firebase account. Push changes on master to the Firebase server by running:

`firebase deploy`
