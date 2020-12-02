Developed this project using Razzle. Razzle is a tool that abstracts all complex configuration needed for SSR into a single dependency-- choose this as it will give the experience of [create-react-app], but then leaves the rest of our app's architectural decisions about frameworks, routing, and data fetching up to us.

Stack used:
1. axios
2. react-router-dom
3. react-redux
4. redux-thunk
5. redux-logger
6. reactstrap
7. bootstrap
8. @media query to handle different screen widths

on _server.js_ file (SSR), API call is handled, if the request URL matches '/': make a call to BASE_URL (https://api.spacexdata.com/v3/launches?limit=100), if there are any query params, then honour them.<br/> With this, which call needs to be done is decided, and corresponding Promise will be assigned to a variable named 'promise'. Wait for the promise to resolve, once the promise is resolved, pass on the resolved data to the redux store as _pre-loaded_ data. So now, the data will be available even during server side rendering and the html will be served. The browser will then pick and runs the JS; and styling will be applied. 

Initial render will always be from server side, client will make a request to the API only if filter is applied. This is achived, by using a unique key property, which will get updated only if an action is dispactched (basically on clicking the buttons in filter section). So this is useful in restricting the call being made after server side rendering and once the component is mounted, this validation is done in the useEffect of Results.js. 

**NOTE** Added a custom hook useSSR to validate whether its server side rendering or client side, based on this on client side will validate width for mobile screen, if width is less than 700px then use small image i.e mission_patch_small

Added test files for Results.js and FilterSection.js file.

Haven't disabled redux-logger so as to verify the above.

Since data change is happening based on the query , only '/' is considered as a valid path.

included eslint config extended to react, and lint-staged for code checking.
**NOTE** : Moved all _devDependencies_ under _dependencies_ as the deployment to Heroku expects all downloadable packages to be under _dependencies_

### Desktop UI 

![UI Image](https://raw.githubusercontent.com/vikasmadan09/launch_spacex/master/images/DesktopView.PNG "Desktop")

### Mobile UI 

![UI Image](https://raw.githubusercontent.com/vikasmadan09/launch_spacex/master/images/MobileView.PNG "Desktop")

### Tablet UI 

![UI Image](https://raw.githubusercontent.com/vikasmadan09/launch_spacex/master/images/Tablet_iPad.PNG "Desktop")

### Performance Auditing through lighthouse

**Slowness has been recorded because of the size of the images.**

#### Desktop

![Ran for emulated desktop](https://raw.githubusercontent.com/vikasmadan09/launch_spacex/master/images/performance/Desktop/Image1.PNG "Emulated Desktop")

#### Mobile

![Ran for emulated Mobile](https://raw.githubusercontent.com/vikasmadan09/launch_spacex/master/images/performance/Mobile/Image1.PNG "Emulated Desktop")
