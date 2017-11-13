/**
 * Created by dauletkaliuly on 12/11/14.
 */
Template.addGdsKeys.helpers({
  lessons: function() {
    lessonList = GdsLessons.find({day: parseInt(Router.current().params.day)}).fetch();
    lessonList.forEach(function(element) {
      element.name = Branches.findOne({id:element.lessonId}).name
    })
    return lessonList
  }
})

Template.addGdsKeys.events({
    'submit form': function(event,template) {
        event.preventDefault();
        lessons = GdsLessons.find({day: parseInt(Router.current().params.day)}).fetch().sort({order:-1});
        var keys = {
            academicYear: Session.get('academicYear'),
            gdsNo: Router.current().params.no,
            variant: template.find('[name=variant]').value,
            day: parseInt(Router.current().params.day),
        }
        lessons.forEach(function(element) {
            if (element.lessonId=='06')
              keys[element.lessonId] = {
                'kaz':template.find('[name=06_kaz]').value,
                'rus':template.find('[name=06_rus]').value
              }
            else
              keys[element.lessonId] = template.find('[name='+element.lessonId+']').value
        })

        Meteor.call('insertGdsKeys',keys, function(error) {
          if (error)
            alert(error.reason)
        });
    }
});

Template.isKaz.helpers({isKaz: function (value) {
  return (value) === '06';
}
});
