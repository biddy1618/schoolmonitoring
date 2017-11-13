//modeartor routes
ModeratorController = RouteController.extend({
  layoutTemplate: 'moderatorLayout',
  onBeforeAction: function() {
    if (!Meteor.user()) {
      if (Meteor.loggingIn())
        this.render(this.loadingTemplate);
      else
        Router.go('loginForm');
      return this.next();
    } else
    if (Meteor.user().profile.userType !== 'moderator') {
      if (Meteor.loggingIn())
        this.render(this.loadingTemplate);
      else
        Router.go('loginForm');
      return this.next();
    }
    this.next()
  }
});

Router.map(function() {
  this.route('moderatorPage', {
    path: '/moderator',
    controller: ModeratorController,
  });

  this.route('moderatorTeachersList', {
    path: '/moderator/teachers',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList')
    }
  });

  this.route('moderatorAddTeacher', {
    path: '/moderator/teachers/add',
    controller: ModeratorController,
  });

  this.route('editTeacher', {
    path: '/moderator/teachers/:_id/edit',
    controller: 'ModeratorController',
    waitOn: function() {
      Meteor.subscribe('teachers', {
        _id: this.params._id
      });
    },
    data: function() {
      return Teachers.findOne({
        _id: this.params._id
      })
    }
  });

  this.route('teachersOut',{
    path:'/moderator/teachers/out',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('teachersOut')
    }
  });

  this.route('teachersIn',{
    path: '/moderator/teachers/in',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('teachersIn')
    }
  });

  this.route('moderatorStudentsList', {
    path: '/moderator/students',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorStudentsList')
    },
    action: function() {
      Session.set('class', {grade:'7',division:'A'})
      this.render()
    }
  });

  this.route('addStudent', {
    path: '/moderator/students/add',
    controller: ModeratorController,
  });

  this.route('editStudent', {
    path: '/moderator/students/:_id/edit',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('students', {
        _id: this.params._id
      })
    },
    data: function() {
      return Students.findOne({
        _id: this.params._id
      })
    }
  });

  this.route('studentsOut', {
    path: '/moderator/students/out',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('studentsOut')
    }
  });

  this.route('studentsIn', {
    path: '/moderator/students/in',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('studentsIn')
    }
  });

  this.route('moderator_lessons_list', {
    path: '/moderator/lessons',
    controller: ModeratorController,
  });

  this.route('kboStudents', {
    path: '/moderator/kbo/students',
    controller: ModeratorController,
    waitOn: function() {
      return Meteor.subscribe('moderatorStudentsList');
    }
  });
  this.route('regionalOlympiadResults', {
    path: '/olympiad/regional/',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('regionalOlympiadResults', {
        academicYear: Session.get('academicYear')
      })
    }
  });

  this.route('addRegionalOlympiadResult', {
    path: '/olympiad/regional/add',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('olympiadStudentsList');
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('regionalOlympiadResults', {
        academicYear: Session.get('academicYear')
      });
    }
  });

  this.route('republicOlympiadResults', {
    path: '/olympiad/republic',
    template: 'republicOlympiadResults',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('republicOlympiadResults', {
        academicYear: Session.get('academicYear')
      })
    }
  });

  this.route('addRepublicOlympiadResult', {
    path: '/olympiad/republic/add',
    controller: ModeratorController,
    template: 'addRepublicOlympiadResult',
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('regionalOlympiadResults', {
        academicYear: Session.get('academicYear'),
        absolutePlace: {
          $in: ['1', '2', '3', '4']
        }
      });
      Meteor.subscribe('republicOlympiadResults', {
        academicYear: Session.get('academicYear')
      });
    }
  });

  this.route('worldOlympiadResults', {
    path: '/olympiad/world',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('worldOlympiadResults', {
        academicYear: Session.get('academicYear')
      });
    }
  });

  this.route('addWorldOlympiadResult', {
    path: '/olympiad/world/add',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('republicOlympiadResults', {
        academicYear: Session.get('academicYear'),
        prize: {
          $in: ['1', '2', '3']
        }
      });
      Meteor.subscribe('worldOlympiadResults', {
        academicYear: Session.get('academicYear')
      });
    }
  });

  this.route('regionalProjectResults', {
    path: '/project/regional',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('regionalProjectResults', {
        academicYear: Session.get('academicYear')
      });
    }
  });

  this.route('addRegionalProjectResult', {
    path: '/project/regional/add',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('moderatorStudentsList');
      Meteor.subscribe('regionalProjectResults', {
        academicYear: Session.get('academicYear')
      });
    }
  });

  this.route('republicProjectResults', {
    path: '/project/republic',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('republicProjectResults', {
        academicYear: Session.get('academicYear')
      });
    }
  });

  this.route('addRepublicProjectResult', {
    path: '/project/republic/add',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('regionalProjectResults', {
        academicYear: Session.get('academicYear'),
        prize: {
          $in: ['1', '2', '3']
        }
      });
      Meteor.subscribe('republicProjectResults', {
        academicYear: Session.get('academicYear')
      });
    }
  });

  this.route('internationalProjectResults', {
    path: '/project/international',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('internationalProjectResults');
    }
  });

  this.route('addInternationalProjectResult', {
    path: '/project/international/add',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('moderatorTeachersList');
      Meteor.subscribe('moderatorStudentsList');
    }
  });

  this.route('gdsRaiting', {
    path: '/gds/:no/raiting',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('gdsKeys', {
        academicYear: Session.get('academicYear'),
        gdsNo: Session.get('gds')
      });
      Meteor.subscribe('moderatorStudentsList');
    },
    action: function() {
      Session.set('gds', this.params.no)
      this.render()
    },

  });

  this.route('gdsResults', {
    path: '/gds/:no/results',
    layoutTemplate: 'moderatorLayout',
    onBeforeAction: function() {
      if (!Meteor.user()) {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm');
        return this.next();
      } else
      if (Meteor.user().profile.userType !== 'moderator') {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm')
        return this.next();
      }

      terms = ['1', '2', '3', '4']
      if (terms.indexOf(this.params.no) == -1) {
        Router.go('notFound')
      }
      return this.next()

    },
    waitOn: function() {
      Meteor.subscribe('moderatorStudentsList')
      Meteor.subscribe('gdsLessons')
      Meteor.subscribe('gdsResults', {
        academicYear: Session.get('academicYear'),
        gdsNo: this.params.no
      })
    }
  });

  this.route('gdsUpload', {
    path: '/gds/:no/upload',
    layoutTemplate: 'moderatorLayout',
    onBeforeAction: function() {
      if (!Meteor.user()) {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm');
        return this.next();
      } else
      if (Meteor.user().profile.userType !== 'moderator') {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm')
        return this.next();
      }

      terms = ['1', '2', '3', '4']
      if (terms.indexOf(this.params.no) == -1) {
        Router.go('notFound')
      }
      return this.next()

    }

  });

  this.route('kboRaiting', {
    path: '/kbo/:no/raiting',
    controller: ModeratorController,
    waitOn: function() {
      Meteor.subscribe('kboKeys', {
        academicYear: Session.get('academicYear'),
        gdsNo: Session.get('gds')
      });
      Meteor.subscribe('moderatorStudentsList');
    },
    action: function() {
      Session.set('kbo', this.params.no)
      this.render()
    }
  });

  this.route('kboResults', {
    path: '/kbo/:no/results',
    layoutTemplate: 'moderatorLayout',
    onBeforeAction: function() {
      if (!Meteor.user()) {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm');
        return this.next();
      } else
      if (Meteor.user().profile.userType !== 'moderator') {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm')
        return this.next();
      }

      terms = ['1', '2', '3']
      if (terms.indexOf(this.params.no) == -1) {
        Router.go('notFound')
      }
      return this.next()

    },
    waitOn: function() {
      Meteor.subscribe('moderatorStudentsList')
      Meteor.subscribe('kboResults', {
        academicYear: Session.get('academicYear'),
        kboNo: this.params.no
      })
    }
  });

  this.route('kboUpload', {
    path: '/kbo/:no/upload',
    layoutTemplate: 'moderatorLayout',
    onBeforeAction: function() {
      if (!Meteor.user()) {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm');
        return this.next();
      } else
      if (Meteor.user().profile.userType !== 'moderator') {
        if (Meteor.loggingIn())
          this.render(this.loadingTemplate);
        else
          Router.go('loginForm')
        return this.next();
      }

      terms = ['1', '2', '3']
      if (terms.indexOf(this.params.no) == -1) {
        Router.go('notFound')
      }
      return this.next()

    }
  })
});
