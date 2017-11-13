Meteor.methods({
  insertKboKeys: function(keys) {
    var keysWithSameVariant = KBOKeys.findOne({academicYear: keys.academicYear,variant:keys.variant,kboNo:keys.kboNo});

    // Удостоверимся что пользователь залогинен
    if (!Meteor.user())
      throw new Meteor.Error(401, "You need to login to add new school");

      // Проверим что у школы есть название
      if (keys.variant === "")
        throw new Meteor.Error(422, 'Please enter variant');
      if (keys.lessonId=="")
        throw new Meteor.Error(302,'Select lesson')
      if (keys.keys=="")
        throw new Meteor.Error(302,'Enter answer keys')
      
        // Проверим что нет других школ с таким же ID
        if (keys.variant && keysWithSameVariant) {
          throw new Meteor.Error(302,
            'This variant has already been posted',
            keysWithSameVariant.id);
          }
          // Выберем поля разрешенные для публикации
          if (Meteor.user().profile.userType == 'admin') {

            keysId = KBOKeys.insert(keys);

            return keysId;
          } else
            throw new Meteor.Error(401, 'You need to login as administrator')
          }
        });
