Template.addLesson.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var name = $(event.target).find('[name=name]').val();
        var id = $(event.target).find('[name=id]').val();

        var lesson = {
            name: name,
            id: id,
        }
        Meteor.call('addLesson', lesson, function(error, id) {
            if (error)
                return alert(error.reason);

            Router.go('lessonsList');
        });
    },
    'click #cancel': function() {
        Router.go('lessonsList');
    }
});