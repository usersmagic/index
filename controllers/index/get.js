
module.exports = (req, res) => {
  const current_language = req.query.lang ? req.query.lang : (req.headers["accept-language"] ? req.headers["accept-language"].split('-')[0] : null);

  if (current_language == 'tr')
    return res.redirect('/tr');

  return res.render('index/index', {
    page: 'index/index',
    title: 'A decentralized platform where people will monetize their own data',
    meta: 'en',
    includes: {
      external: {
        css: ['page', 'general'],
        js: ['page', 'serverRequest']
      }
    }
  });
}
