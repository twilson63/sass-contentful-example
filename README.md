# Example using Contentful to build sass config

This is an example project of using contentful to generate different sass settings. This example pulls the background color and foreground color from contentful and then adds them as sass variables and then uses a build script to generate css from sass.

## How to run the demo

1. Go into contentful and open the green entry, of entry type config_scss
2. change it to a color like yellow, then publish entry.
3. clone this repo
4. npm install
5. npm run build-scss
6. npm run build-css
7. npm start

Open the browser to localhost:3000 and you should see the colors you set in the contentful entry represented on the page.

## How it works

First we created an entry type in contentful called config_scss, but you can call it whatever you want. Then we created a ejs template file called `variables.scss.ejs` this file looks like this:

``` scss
$background: <%= background %>;
$foreground: <%= color %>;

body {
  background-color: $background;
  color: $foreground;
}
```

Then we create a simple script that will pull the data from contentful and render a new app.scss file in the sass folder.

> `node create-scss.js > sass/app.scss`

``` js
const config = require('zero-config')(__dirname + '/../', { dcValue: 'us-east-1'})
// create a sass file from ejs
const ejs = require('ejs')
const fs = require('fs')

const { createClient } = require('contentful')

const client = createClient({
  space: config.get('contentful.space'),
  accessToken: config.get('contentful.access_token')
})

var template = ejs.compile(fs.readFileSync(__dirname + '/../variables.scss.ejs', 'utf-8'))

client.getEntry(config.get('contentful.entry'))
  .then(result => {
    //fs.writeFileSync(__dirname + '/../sass/app.scss', template(result.field), 'utf-8')
    console.log(template(result.fields))
  })
```

> `package.json`

``` json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build-css": "node-sass sass/app.scss app.css",
  "build-scss": "node scripts/create-scss.js > sass/app.scss",
  "start": "w3"
}
```
