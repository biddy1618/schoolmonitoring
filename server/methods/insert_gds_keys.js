/**
 * Created by dauletkaliuly on 12/12/14.
 */
Meteor.methods({
    insertGdsKeys: function(keys) {
      var keysWithSameVariant = GDSKeys.findOne({academicYear: keys.academicYear,variant:keys.variant,gdsNo:keys.gdsNo});

      // Удостоверимся что пользователь залогинен
      if (!Meteor.user())
        throw new Meteor.Error(401, "You need to login to add new school");

        // Проверим что у школы есть название
          if (keys.variant === "")
            throw new Meteor.Error(422, 'Please enter variant');
                  // Проверим что нет других школ с таким же ID
          if (keys.variant && keysWithSameVariant) {
                    throw new Meteor.Error(302,
                      'This variant has already been posted',
                      keysWithSameVariant.id);
                    }
          lessons = GdsLessons.find({day: keys.day}).fetch().sort({order:-1});
          // lessons.forEach(function(element) {
          //     if (keys[element.lessonId].length!=element.questions)
          //       throw new Meteor.Error(422,'Answer keys of '+element.lessonId+' are not sufficient')
          // })
                    // Выберем поля разрешенные для публикации
                    if (Meteor.user().profile.userType == 'admin') {

                      keysId = GDSKeys.insert(keys);

                      return keysId;
                    } else
                      throw new Meteor.Error(401, 'You need to login as administrator')
    }
});
