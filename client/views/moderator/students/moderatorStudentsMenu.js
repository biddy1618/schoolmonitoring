Template.moderatorStudentsMenu.helpers({
  active: function() {
      a = {};
    if (Router.current().url.slice(-3) == 'out')
      a.transferOut = 'active'

    if (Router.current().url.slice(-2) == 'in')
      a.transferIn = 'active'
    if (Router.current().url.slice(-8)=='students')
      a.students = 'active'
    if (Router.current().url.slice(-3)=='add')
      a.add = 'active'  
    return a
  }
})
Template.moderatorStudentsMenu.events({
  'click #7a': function() {
    Session.set('class', {
      grade: '7',
      division: 'A'
    })
    console.log('clicked')
  },
  'click #7b': function() {
    Session.set('class', {
      grade: '7',
      division: 'B'
    })
    console.log('clicked')
  },
  'click #7c': function() {
    Session.set('class', {
      grade: '7',
      division: 'C'
    })
  },
  'click #7d': function() {
    Session.set('class', {
      grade: '7',
      division: 'D'
    })
  },
  'click #8a': function() {
    Session.set('class', {
      grade: '8',
      division: 'A'
    })
  },
  'click #8b': function() {
    Session.set('class', {
      grade: '8',
      division: 'B'
    })
  },
  'click #8c': function() {
    Session.set('class', {
      grade: '8',
      division: 'C'
    })
  },
  'click #8d': function() {
    Session.set('class', {
      grade: '8',
      division: 'D'
    })
  },
  'click #9a': function() {
    Session.set('class', {
      grade: '9',
      division: 'A'
    })
  },
  'click #9b': function() {
    Session.set('class', {
      grade: '9',
      division: 'B'
    })
  },
  'click #9c': function() {
    Session.set('class', {
      grade: '9',
      division: 'C'
    })
  },
  'click #9d': function() {
    Session.set('class', {
      grade: '9',
      division: 'D'
    })
  },
  'click #10a': function() {
    Session.set('class', {
      grade: '10',
      division: 'A'
    })
  },
  'click #10b': function() {
    Session.set('class', {
      grade: '10',
      division: 'B'
    })
  },
  'click #10c': function() {
    Session.set('class', {
      grade: '10',
      division: 'C'
    })
  },
  'click #10d': function() {
    Session.set('class', {
      grade: '10',
      division: 'D'
    })
  },
  'click #11a': function() {
    Session.set('class', {
      grade: '11',
      division: 'A'
    })
  },
  'click #11b': function() {
    Session.set('class', {
      grade: '11',
      division: 'B'
    })
  },
  'click #11c': function() {
    Session.set('class', {
      grade: '11',
      division: 'C'
    })
  },
  'click #11d': function() {
    Session.set('class', {
      grade: '11',
      division: 'D'
    })
  }
})
