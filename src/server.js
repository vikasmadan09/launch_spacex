import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import axios from 'axios';
import configureStore from './store/configureStore';
import { BASE_URL } from './common/config';

import serialize from 'serialize-javascript';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        const context = {};
        let promise;
        if (req.url === '/') {
            promise = axios.get(`${BASE_URL}`);
        } else {
            const query = req.url.split('?')[1];
            promise = axios.get(`${BASE_URL}&${query}`);
        }

        if (context.url) {
            res.redirect(context.url);
        } else {
            promise.then((response) => {
                
                // Compile an initial state
                const preloadedState = { data: { loading: false, filterData: response.data, key: 0 } };

                // Create a new Redux store instance
                const store = configureStore(preloadedState);

                // Render the component to a string
                const markup = renderToString(
                    <Provider store={store}>
                        <StaticRouter context={context} location={req.url}>
                            <App />
                        </StaticRouter>
                    </Provider>
                );

                // Grab the initial state from our Redux store
                const finalState = store.getState();

                res.status(200).send(
                    `<!doctype html>
      <html lang="en">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="Website with sample content" />
          ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
          ${
              process.env.NODE_ENV === 'production'
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body>
          <div id="root">${markup}</div>
          <script>window.__PRELOADED_STATE__ = ${serialize(finalState)}</script>
      </body>
  </html>`
                );
            });
        }
    });

export default server;
