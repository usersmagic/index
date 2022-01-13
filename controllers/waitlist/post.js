const Waitlist = require('../../models/waitlist/Waitlist');

module.exports = (req, res) => {
  Waitlist.createWaitlist(req.body, err => {
    if (err) {
      res.write(JSON.stringify({ error: err, success: false }));
      return res.end();
    }

    res.write(JSON.stringify({ success: true }));
    return res.end();
  });
}
