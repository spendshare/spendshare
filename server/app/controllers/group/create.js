const mongoose = require('mongoose');

const Group = mongoose.model('Group');

module.exports = function(req, res) {
  const g = new Group({
    name: req.body.name
  });

  console.warn(req.body.name);
  g.save(function(err) {
    if (err) console.log(err);
    // shrug
  });
  res.sendStatus(200);
};
