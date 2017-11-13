Template.moderatorGdsMenu.helpers({
  active: function() {
    menu={}
    if (Router.current().url.slice(-7)=="raiting")
      menu.raiting='active'
    if (Router.current().url.slice(-6)=='upload')
      menu.upload='active'
    if (Router.current().url.slice(-7)=='results')
      menu.results = 'active'
      return menu
  },
  no: function() {
    return Router.current().params.no
  },
})
