Developed this project using Razzle. Razzle is a tool that abstracts all complex configuration needed for SSR into a single dependency-- choose this as it will give the experience of [create-react-app], but then leaves the rest of our app's architectural decisions about frameworks, routing, and data fetching up to us.

On starting this project, noticed that the **V3** of spaceXdata has been depricated, thought of using the latest **V4**, but wasn't sure whether that would be accepted or not.<br/>
_NOTE:_ Not all the records have the images. Records after launch_year 2014 will have images.

Stack used:
1. axios
2. react-router-dom
3. react-redux
4. redux-thunk
5. redux-logger
6. reactstrap
7. bootstrap
8. scss

on _server.js_ file (SSR), API call is handled, if the request URL matches '/': make a call to BASE_URL (https://api.spacexdata.com/v3/launches?limit=100), if there are any query params, then honour them.<br/> With this, which call needs to be done is decided, and corresponding Promise will be assigned to a variable named 'promise'. Wait for the promise to resolve, once the promise is resolved, pass on the resolved data to the redux store as _pre-loaded_ data. So now, the data will be available even during server side rendering and the html will be served. The browser will then pick and runs the JS; and styling will be applied. 

Initial render will always be from server side, client will make a request to the API only if filter is applied. This is achived, by using a key property, which will get updated only if an action is dispactched (basically on clicking the buttons in filter section). So this is useful in restricting the call being made after server side rendering and once the component is mounted, this validation is done in the useEffect of Results.js. Included test file for Results.js file.

Haven't disabled redux-logger so as to verify the above.

Since data change is happening based on the query , have included only '/' as a valid path.

included eslint config extended to react, and lint-staged for code checking.

### UI 

![UI Image](https://raw.githubusercontent.com/vikasmadan09/launch_spacex/master/images/Page.PNG "Desktop")


### Performance Auditing through lighthouse

Performance auditing was done for launch_year 2020 which has images. slowness has been recorded because of the size of the images.

![Ran for emulated desktop](https://raw.githubusercontent.com/vikasmadan09/launch_spacex/master/images/performance/Desktop/Image1.PNG "Emulated Desktop")

![Ran for emulated Mobile](https://raw.githubusercontent.com/vikasmadan09/launch_spacex/master/images/performance/Mobile/Image1.PNG "Emulated Desktop")
