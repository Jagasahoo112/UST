# Workbench Word Frontend

### Generated with yeoman generator
https://github.com/OfficeDev/generator-office

### Built in React
https://reactjs.org/

## npm i

Install node modules.

## npm run dev-server

You may need to run this the first time you start the project on Mac. Then npm start after that.

## npm start

This will run the add-in dev server on port 3000 and open a blank word document where the add-in will be running.

In the word document window you will see the custom **Workbench** tab at the top which has various buttons in the ribbon.

When you click a button the associated taskpane will open on the right side.

From there you can open other word documents and the custom **Workbench** tab will be attached to those documents as well.

## Notes

This add-in taskpane communicates with the backend API located at https://github.com/ey-org/backend-workbench-word.

This add-in taskpane code began from the Word add-in tutorial located here https://docs.microsoft.com/en-us/office/dev/add-ins/tutorials/word-tutorial.