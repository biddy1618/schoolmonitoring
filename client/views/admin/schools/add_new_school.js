Template.addSchool.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var full_kz_name = $(event.target).find('[name=full_kz_name]').val(),
            short_kz_name=$(event.target).find('[name=short_kz_name]').val(),
            eng_name=$(event.target).find('[name=eng_name]').val(),
            email=$(event.target).find('[name=email]').val(),
            id = $(event.target).find('[name=id]').val();

        var school = {
            full_kz_name: full_kz_name,
            short_kz_name:short_kz_name,
            eng_name:eng_name,
            email:email,
            id: id
        };
        console.log(school)
        Meteor.call('addSchool', school, function(error, id) {
            if (error)
                return alert(error.reason);

            Router.go('schoolsList');
        });
    },
    'click #cancel': function() {
        Router.go('schoolsList');
    }
});