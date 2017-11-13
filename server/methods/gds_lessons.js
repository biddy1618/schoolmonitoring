Meteor.methods({
  insertGdsLesson: function(obj) {
    var lessonWithSameOrder = GdsLessons.findOne({lessonId:obj.lessonId});

    // Удостоверимся что пользователь залогинен
    if (!Meteor.user())
      throw new Meteor.Error(401, "You need to login to add lesson");

      // Проверим что у школы есть название
      if (obj.day === "")
        throw new Meteor.Error(422, 'Please enter gds day');
        if (obj.lessonId === "")
          throw new Meteor.Error(422, 'Please choose lesson');
          if (obj.from === "")
            throw new Meteor.Error(422, 'Please enter lesson order');
            if (obj.to === "")
              throw new Meteor.Error(422, 'Please enter quetion quantity')
              // Проверим что у школы  есть ID

                // Проверим что нет других школ с таким же ID
                if (obj.order && lessonWithSameOrder) {
                  throw new Meteor.Error(302,
                    'This lesson has already been posted',
                    lessonWithSameOrder.id);
                  }

                  // Выберем поля разрешенные для публикации
                  if (Meteor.user().profile.userType == 'admin') {

                    var lesson = _.extend(_.pick(obj, 'day', 'lessonId', 'from', 'to'));
                    lessonId = GdsLessons.insert(lesson);

                    return lessonId;
                  } else
                    throw new Meteor.Error(401, 'You need to login as administrator')
  }
})
