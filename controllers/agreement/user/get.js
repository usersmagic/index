module.exports = (req, res) => {
  const current_language = req.query.lang ? req.query.lang : (req.headers["accept-language"] ? req.headers["accept-language"].split('-')[0] : null);

  return res.render('agreement/user', {
    page: 'agreement/user',
    title: current_language == 'tr' ? 'Kullanıcı Sözleşmesi' : 'User Agreement',
    includes: {
      external: {
        css: ['page']
      }
    },
    current_language
  });
}
