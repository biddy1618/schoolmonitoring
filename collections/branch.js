Branches = new Meteor.Collection('branches');
Quizzes = new Meteor.Collection('quizzes');

Meteor.methods({
  addLesson: function(lessonAttributes) {
      var lessonWithSameId = Branches.findOne({id: lessonAttributes.id});

    // Удостоверимся что пользователь залогинен
    if (!Meteor.user())
      throw new Meteor.Error(401, "You need to login to add new lesson");

    // Проверим что у школы есть название
    if (lessonAttributes.name==="")
      throw new Meteor.Error(422, 'Please fill in name of the lesson');

    // Проверим что у школы  есть ID
    if (lessonAttributes.id==="")
      throw new Meteor.Error(422, 'Please fill in id');

    // Проверим что нет других школ с таким же ID
    if (lessonAttributes.id && lessonWithSameId) {
      throw new Meteor.Error(302,
        'This lesson has already been posted',
        lessonWithSameId.id);
    }

    // Выберем поля разрешенные для публикации
    var lesson = _.extend(_.pick(lessonAttributes, 'name', 'id'));

    var lessonId = Branches.insert(lesson);

    return lessonId;
  },
  updateLesson: function(lessonAttributes,currentLessonId) {
    var lessonWithSameId = Branches.findOne({id: lessonAttributes.id});
    // Удостоверимся что пользователь залогинен
    if (!Meteor.user())
      throw new Meteor.Error(401, "You need to login to add new lesson");

    // Проверим что у школы есть название
    if (lessonAttributes.kz_name==="")
      throw new Meteor.Error(422, 'Please fill in name of the lesson');

    // Проверим что у школы  есть ID
    if (lessonAttributes.id==="")
      throw new Meteor.Error(422, 'Please fill in id');

    // Проверим что нет других школ с таким же ID
    // if (schoolAttributes.id && schoolWithSameId) {
    //   throw new Meteor.Error(302,
    //     'This school has already been posted',
    //     schoolWithSameId.id);
    // }

    Branches.update(currentLessonId, {$set:lessonAttributes}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        
      }
  });
  }
});
