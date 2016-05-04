import './login.html';

Template.login.onCreated(function loginOnCreated() {
  console.log( "login onCreated" );
});

Template.login.onRendered(function loginOnRendered() {
  console.log( "login onRendered" );
});

Template.login.helpers({

});

Template.login.events({
  'submit form'( event )
  {
    event.preventDefault();
    const target = event.target;
    const username = target.loginUserName.value;
    const password = target.loginPassword.value;
    console.log( "username, password", username, password );

    Meteor.loginWithPassword( username, password, ( error ) => {
      if( ! error )
      {
        FlowRouter.go( '/' );
      }else
      {
        console.log( "error", error );
      }
    });
  },

});
