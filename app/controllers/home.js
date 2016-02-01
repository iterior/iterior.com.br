const HomeController = {
  index: (req, res) => {
    res.render('home/index');
  },
  feedback: (req, res) => {
    res.render('home/feedback');
  }
};

module.exports = HomeController;
