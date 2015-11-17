var HomeController = {
  index: function (req, res) {
    res.render('home/index');
  },
  feedback: function (req, res) {
    res.render('home/feedback');
  }
};

module.exports = HomeController;
