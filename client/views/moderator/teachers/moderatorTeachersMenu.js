Template.moderatorTeachersMenu.helpers({
  active: function() {
      a = {};
      if (Router.current().url.slice(-3) == 'out')
        a.transferOut = 'active'

        if (Router.current().url.slice(-2) == 'in')
          a.transferIn = 'active'
      if (Router.current().url.slice(-3)=='add')
        a.add='active'
      if (Router.current().url.slice(-8)=='teachers')
        a.teachers = 'active'    
    return a
  }
})
