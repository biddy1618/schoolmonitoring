//Kadira.connect('8osLdMRvujLDC7Q3D','cdfa4932-0caf-42fb-8a62-fda1bd95dbd4');
Meteor.users.deny({
  update: function() {
    return true
  }
})
