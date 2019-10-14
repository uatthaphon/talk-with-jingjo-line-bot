const functions = require('firebase-functions');
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer 1GL+iDlKAExJeJW8dU2t1WsEKtW2e7FYvyJ9GUmAdyJbTTbU7VlKlDEHuV9KdfOwiGuPbM9OD6MtqmVwmjZiKlyt+DkE+PQmvfiwGJEUrbZKqhSjdBcClTvTdTrrWhYsTDUjxXh9fwVvZmo/LjxtQAdB04t89/1O/w1cDnyilFU=`
};

exports.lineBot = functions.https.onRequest((req, res) => {
  if (req.body.events[0].message.type !== 'text') {
    return;
  }

  const text = req.body.events[0].message.text;
  const resumes = [`cv`, `resume`, `เรซูเม่`, `ซีวี`];

  for (var i = resumes.length - 1; i >= 0; --i) {
    if (text.indexOf(resumes[i]) !== -1) {
      replyResume(req.body);
      return;
    }
  }

  reply(req.body);
});

const reply = (bodyResponse) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: bodyResponse.events[0].message.text
        }
    ]
    })
  });
};

const replyResume = (bodyResponse) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: `ตะกี้ถามถึง เรซูเม่ ของผมหรือเปล่าครับ? นี่ครับเข้าไปตาม link นี้ได้เลยครับ https://www.linkedin.com/in/atthaphon-urairat-24818328/`
        }
    ]
    })
  });
};
