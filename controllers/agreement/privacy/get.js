module.exports = (req, res) => {
  const current_language = req.query.lang ? req.query.lang : (req.headers["accept-language"] ? req.headers["accept-language"].split('-')[0] : null);

  return res.render('agreement/privacy', {
    page: 'agreement/privacy',
    title: current_language == 'tr' ? 'Gizlilik Sözleşmesi' : 'Privacy Statement',
    includes: {
      external: {
        css: ['page']
      }
    },
    current_language
  });
}
