import './header.html';

Template.header.onCreated(function headerOnCreated() {
  console.log( "header onCreated" );
});

Template.header.onRendered(function headerOnRendered() {
  console.log( "header onRendered" );
});

Template.header.helpers({
  pageName() {
    return FlowRouter.getRouteName();
  },

});

Template.header.events({
  'click .logout'( event ) {
    event.preventDefault();
    Meteor.logout();
  }
});
