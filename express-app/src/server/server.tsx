const express = require('express');
const app = express();
import * as ReactDOMServer from 'react-dom/server';
import { createFactory } from 'react';
import Todos from '../components/Todos';
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.resolve(__dirname, "..", "..", "dist", 'index.html');

let sendhtml = '';
const AppFactory = createFactory(Todos);

fs.readFile(filePath, 'utf8', (err:any, htmlData:any) => {
    if (err) {
      console.error('err', err);
      //return res.status(404).end()
    }

    const html = ReactDOMServer.renderToString(AppFactory());

    sendhtml = htmlData.replace('<div id="app"></div>',`<div id="app">${html}</div>`);
    // sendhtml = htmlData;
  });

app.use(express.static(path.join(__dirname, "..", "..", "dist", "scripts")));
app.get('/', (req, res) => res.send(sendhtml));

app.listen(3008, ()=> console.log("Example app listening on 3008"));