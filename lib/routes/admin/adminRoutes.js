/**
 * Created by dauletkaliuly on 12/10/14.
 */
AdminController = RouteController.extend({
  layoutTemplate: 'adminLayout',
  onBeforeAction: function() {
    if (!Meteor.user()) {
      if (Meteor.loggingIn())
        this.render(this.loadingTemplate);
      else
        Router.go('loginForm');
      return this.next();
    } else
    if (Meteor.user().profile.userType !== 'admin') {
      if (Meteor.loggingIn())
        this.render(this.loadingTemplate);
      else
        Router.go('loginForm')
      return this.next();
    }
    this.next()
  }
});

GdsController = RouteController.extend({
  layoutTemplate: 'adminLayout',
  onBeforeAction: function() {
    if (!Meteor.user()) {
      if (Meteor.loggingIn())
        this.render(this.loadingTemplate);
      else
        Router.go('loginForm');
      return this.next();
    } else
    if (Meteor.user().profile.userType !== 'admin') {
      if (Meteor.loggingIn())
        this.render(this.loadingTemplate);
      else
        Router.go('loginForm')
      return this.next();
    }

    terms = ['1', '2', '3', '4']
    days = ['1', '2']
    if (terms.indexOf(this.params.no) == -1) {
      Router.go('notFound')
    }
    return this.next()

  },

});
KboController = RouteController.extend({
  layoutTemplate: 'adminLayout',
  onBeforeAction: function() {
    if (!Meteor.user()) {
      if (Meteor.loggingIn())
        this.render(this.loadingTemplate);
      else
        Router.go('loginForm');
      return this.next();
    } else
    if (Meteor.user().profile.userType !== 'admin') {
      if (Meteor.loggingIn())
        this.render(this.loadingTemplate);
      else
        Router.go('loginForm')
      return this.next();
    }

    terms = ['1', '2', '3', '4']
    days = ['1', '2']
    if (terms.indexOf(this.params.no) == -1) {
      Router.go('notFound')
    }
    return this.next()

  },

});

Router.map(function() {
  this.route('loginForm', {
    path: '/',
    layoutTemplate: "layout",
    onBeforeAction: function() {
      if (Meteor.user())
        if (Meteor.user().profile.userType == 'admin')
          Router.go('coordinatorPage');
        else if (Meteor.user().profile.userType == 'moderator')
        Router.go('moderatorPage')
      this.next()
    }
  });
  this.route('coordinatorPage', {
    path: '/coordinator',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
  });

  this.route('lessonsList', {
    path: '/coordinator/lessons',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
    // onBeforeAction: function() {
    //     return Meteor.subscribe('branches');
    // },
  });

// Lesson routes  Beginning
  this.route('addLesson', {
    path: '/coordinator/lessons/add',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
  });
  this.route('editLesson', {
    path: '/coordinator/lessons/:_id/edit',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
    data: function() {
      return Branches.findOne({
        _id: this.params._id
      });
    }
  });
//Lesson routes end

  this.route('teachersList', {
    path: '/coordinator/teachers',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
    waitOn: function() {
      return Meteor.subscribe('teachers', {})
    }
  });

  this.route('studentsList', {
    path: '/coordinator/students',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
    waitOn: function() {
      return Meteor.subscribe('students', {})
    }
  });


  this.route('schoolsList', {
    path: '/coordinator/schools',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
    waitOn: function() {
      return Meteor.subscribe('schools');
    }
  });

  this.route('addSchool', {
    path: '/coordinator/schools/new',
    controller: AdminController,
    layoutTemplate: 'adminLayout'
  });

  this.route('editSchool', {
    path: '/coordinator/schools/:_id/edit',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
    waitOn: function() {
      return Meteor.subscribe('schools')
    },
    data: function() {
      return Schools.findOne({
        _id: this.params._id
      });
    }
  });

  this.route('departmentsList', {
    path: '/coordinator/departments',
    controller: AdminController
  });

  this.route('addDepartment', {
    path: '/coordinator/departments/add',
    controller: AdminController
  });


//Gds routes Beginning
  this.route('gdsGeneral', {
    path: '/coordinator/gds',
    controller: AdminController,
  });

  this.route('gdsLessons', {
    path: '/coordinator/gds/lessons',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
    waitOn: function() {
      Meteor.subscribe('gdsLessons')
    }
  });

  this.route('adminGdsPage', {
    path: '/coordinator/gds/:no',
    layoutTemplate: 'adminLayout',
    controller: GdsController
  });

  this.route('adminGdsKeys', {
    path: '/coordinator/gds/:no/keys/',
    layoutTemplate: 'adminLayout',
    controller: GdsController,
    waitOn: function() {
      Meteor.subscribe('gdsKeys', {
        gdsNo: this.params.no
      })
    }
  });

  this.route('addGdsKeys', {
    path: '/coordinator/gds/:no/:day/keys/add',
    layoutTemplate: 'adminLayout',
    onBeforeAction: function() {
      if (!Meteor.user()) {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm');
        return this.next();
      } else
      if (Meteor.user().profile.userType !== 'admin') {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm')
        return this.next();
      }
      terms = ['1', '2', '3', '4'];
      days = ['1', '2'];
      if (terms.indexOf(this.params.no) == -1 || days.indexOf(this.params.day) == -1) {
        Router.go('notFound')
      }
      return this.next()

    },
    waitOn: function() {
      Meteor.subscribe('gdsLessons')
    }
  });
//Gds routes end


//KBO routes beginning
  this.route('kboGeneral', {
    path: '/coordinator/kbo',
    controller: AdminController,
  });

  this.route('kboLessons', {
    path: '/coordinator/kbo/lessons',
    controller: AdminController,
    layoutTemplate: 'adminLayout',
    waitOn: function() {
      Meteor.subscribe('kboLessons')
    }
  });

  this.route('adminKboPage', {
    path: '/coordinator/kbo/:no',
    layoutTemplate: 'adminLayout',
    controller: GdsController
  });

  this.route('adminKboKeys', {
    path: '/coordinator/kbo/:no/keys/',
    layoutTemplate: 'adminLayout',
    controller: KboController,
    waitOn: function() {
      Meteor.subscribe('kboKeys', {
        kboNo: this.params.no
      })
    }
  });
//KBO routes end

this.route('notFound', {
  path: '/404',
  layoutTemplate: 'layout',
  template: 'notFound'
});
});
