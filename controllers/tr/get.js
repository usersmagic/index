module.exports = (req, res) => {
  return res.render('tr/index', {
    page: 'tr/index',
    title: 'Kullanıcılarınıza her zamankinden daha çok erişin',
    meta: 'tr',
    includes: {
      external: {
        css: ['page', 'general'],
        js: ['page', 'serverRequest']
      }
    }
  });
}
