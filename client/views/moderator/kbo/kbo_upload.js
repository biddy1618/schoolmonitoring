Template.kboUpload.helpers({
  kboNum: function() {
    return Router.current().params.no
  },

  errors: function() {
    return Errors.find().fetch().slice(0,-1)
  }
})
Template.kboUpload.events({
    'click #kbo-upload': function(event, template) {
        Errors.remove({});
        var file = template.find('#file').files[0];
        if (file)
          console.log('file uloaded')
        else
          {
          alert('No file was selected')
          throw new Error("Select file")
          }
        var reader = new FileReader();
        reader.onload = function(){
            var text = reader.result;
            var a= text.split('\n');

            Meteor.call('uploadKBO',a,Session.get('academicYear'),Router.current().params.no, function(error,errors) {
                if (error)
                    alert(error.reason)
                else
                    alert('KBO results are added')
                if (errors)
                  errors.forEach(function(err){
                    Errors.insert({reason:err})
                  })
            });
        };
        reader.readAsText(file);
    }
});
