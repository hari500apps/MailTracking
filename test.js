const express = require('express');
var path = require('path');
const CircularJSON = require('circular-json');
var request = require('request');
var sanitizeHtml = require('sanitize-html');
const LZString = require('lz-string');
// const Ably = require('ably').Realtime('oybGjQ.Yv7tcg:4UrB37IRpda2JydY');
const notifier = require('node-notifier');
const iplocation = require("iplocation").default;

// String
// notifier.notify('Message');

const app = express();
var cors = require('cors');
var fs = require('fs');

var dir = path.join(__dirname, 'public');
console.log('dir', dir);
const htmlparser2 = require('htmlparser2');
const fetch = require('node-fetch');
app.use(cors());
var getClientIp = function (req) {
  return (
    (
      req.headers['X-Forwarded-For'] ||
      req.headers['x-forwarded-for'] ||
      ''
    ).split(',')[0] || req.client.remoteAddress
  );
};
app.use(express.static(dir));
app.get('/:lz', async (req, res) => {

   const lzdata1 = JSON.parse(LZString.decompressFromEncodedURIComponent(req.params['lz']));

console.log('lzdata1lzdata1', lzdata1)
  // ipAdd(getClientIp(req));
console.log('getClientIp(req)',getClientIp(req));

console.log('IP ADRESSm',await iplocation(getClientIp(req)));
const sendObj={};
sendObj.name = lzdata1.recipients;
sendObj.subject  = lzdata1.subject;
sendObj.address= await iplocation(getClientIp(req));
    var myHeaders = {};
myHeaders["Authorization"]= "Basic QUMyNDcxMWI3NTAyY2E5NGE5ZGMyMzMzZTg5NGZiOGJkZjpjMTJhYmQ4ODFjODc4YjUwNmFhYTRmYTM2YjA0ODQ0MQ==";
myHeaders["Content-Type"]= "application/x-www-form-urlencoded";

var urlencoded = new URLSearchParams();
urlencoded.append("To", "whatsapp:+918978222460");
urlencoded.append("From", "whatsapp:+14155238886");
urlencoded.append("Body", JSON.stringify(sendObj));

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://api.twilio.com/2010-04-01/Accounts/AC24711b7502ca94a9dc2333e894fb8bdf/Messages.json", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  res.sendFile(path.join(__dirname, 'public/mailtracer.gif'));

});
app.listen(5000, function () {
  console.log(
    'Listening on http://localhost:3000/',
    new Date().getMinutes() + ':' + new Date().getSeconds()
  );
});
// var WordPOS = require('wordpos'),
//   wordpos = new WordPOS();
// var sw = require('stopword');
// const {
//   SSL_OP_COOKIE_EXCHANGE
// } = require('constants');
// var nlp = require('compromise')
// var inScriptElement = false;
// const stWords = ['is', 'l', 'k', 'e', 'i', 'in', 'if', 'c', 'f', 'd', 'a', '0', 'g', 'l', 'h', 'm']
// var eventsCounter = {};
// request('https://track.ly/', function(error, response, html) {
//   if (!error && response.statusCode == 200) {
//   const s=  sanitizeHtml(
//       html,
//       {
//         textFilter: (text, tagName) =>{
//           if (text.length > 1)
//             parseContent(text)
//           // return text.replace(/\.\.\./, '');
//         }
//       }
//     );

//     const parser = new htmlparser2.Parser({
//       onopentag: function(name, attribs) {
//       //     console.log('name', name);

//       //     console.log('attribs', attribs.style);
//       // console.log('attribs.hasOwnProperty', !attribs.hasOwnProperty('style'))

//         fs.writeFile('demo.txt', JSON.stringify(attribs), (err) => {
//                   // throws an error, you could also catch it here
//                   if (err) throw err;
//                   // success case, the file was saved
//                   // console.log('Lyric saved!');
//               });
//         if ((name !== "script" && attribs.type !== "text/javascript") || (attribs.style == undefined && attribs.class == undefined)) inScriptElement = true;
//       },
//       ontext(text) {
//         //if (inScriptElement)
//       },
//       onclosetag(tagname) {
//         if (tagname === "script") inScriptElement = false;
//       }
//     }, {
//       decodeEntities: true
//     });
//     parser.write(html);
//     parser.end(endParser());
//   }
// });

// function parseContent(text) {
//   if (text.length > 1) {
//     var pattern = /\w+/g;
//     var matchedWords = text.match(pattern);
//     console.log('matchedWords------------------------------->', matchedWords);

//     parseWordCount(matchedWords)
//   }
// }

// function parseWordCount(matchedWords) {
//   if(matchedWords!==null){
//     matchedWords.forEach((item) => {
//       if (/^[a-zA-Z]+$/.test(item)) {
//         var newString = sw.removeStopwords(item.toLowerCase().split(' '), stWords);
//         if (newString.length > 0) newString.forEach((list) => {
//           if (nlp(list).has('#Verb')) eventsCounter[list] = (eventsCounter[list] || 0) + 1;
//           // fs.writeFile('demo.txt', CircularJSON.stringify(eventsCounter), (err) => {
//           //   if (err) throw err;
//           // });
//         })
//       }
//     })

//   }

// }

// function endParser() {
//   console.log('eventsCounter', eventsCounter);
//   const count = Object.keys(eventsCounter).length
//   console.log('count', count);
// }
// --------------------------------------
