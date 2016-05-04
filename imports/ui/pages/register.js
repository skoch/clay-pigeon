import './register.html';

Template.register.onCreated(function registerOnCreated() {
  console.log( "register onCreated" );
});

Template.register.onRendered(function registerOnRendered() {
  console.log( "register onRendered" );
});

Template.register.helpers({

});

Template.register.events({
  'submit form'( event )
  {
    event.preventDefault();
    const target = event.target;
    const username = target.registerUserName.value;
    const password = target.registerPassword.value;
    console.log( "username, password", username, password );
    Accounts.createUser({
      username: username,
      password: password
    }, ( error ) => {
      if( ! error )
      {
        FlowRouter.go( '/' );
      }
    });
  },

});
