/**
 * Created by dauletkaliuly on 12/13/14.
 */
Template.kboLessons.helpers({
    lessons: function() {
        lessonList = Branches.find().fetch();
        return lessonList;
    },
    day1lessons: function() {
      lessonList = GdsLessons.find({day:1}).fetch().sort({order:-1});
      lessonList.forEach(function(element) {
        element.name = Branches.findOne({id:element.lessonId}).name
      })
      return lessonList
    },
    day2lessons: function() {
      lessonList = GdsLessons.find({day:2}).fetch().sort({order:-1});
      lessonList.forEach(function(element) {
        element.name = Branches.findOne({id:element.lessonId}).name
      })
      return lessonList
    }
});

Template.kboLessons.events({
    'click #save': function (event,template) {
      event.preventDefault();
      var obj = {
        day: parseInt(template.find('[name=day]').value),
        lessonId: template.find('[name=lessons]').value,
      }

      from=parseInt(template.find('[name=from]').value),
      to=parseInt(template.find('[name=to]').value)

      from = (from>0) ? from:'';
      to = (to>0) ? to:'';

      obj.from=from;
      obj.to=to;

      Meteor.call('insertGdsLesson',obj, function(error) {
        if (error)
          alert(error.reason);
      });

    },
});
