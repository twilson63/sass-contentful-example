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
