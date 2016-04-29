import './login.html';

Template.login.onCreated(function loginOnCreated() {
  console.log( "login onCreated" );
});

Template.login.onRendered(function loginOnRendered() {
  console.log( "login onRendered" );
});

Template.login.helpers({

});
