/**
 * Created by dauletkaliuly on 12/11/14.
 */
Template.adminKboKeys.helpers({
    no: function() {
        return Router.current().params.no
    },
    variants: function() {
      return KBOKeys.find({academicYear:Session.get('academicYear')})
    },

    lessons: function() {
      return Branches.find({});
    }
});

Template.adminKboKeys.events({
  'click #save': function(event,template) {
    event.preventDefault();
    var lesson = template.find('[name=lesson]').value,
        variant = template.find('[name=variant]').value,
        keys = template.find('[name=keys]').value;

    obj = {
      academicYear: Session.get('academicYear'),
      kboNo: Router.current().params.no,
      lesson: lesson,
      variant: variant,
      keys: keys
    }

    Meteor.call('insertKboKeys',obj,function(error){
      if (error)
        alert(error.reason)
      else
        $("[data-dismiss=modal]").trigger({ type: "click" });
    });
  }
})
