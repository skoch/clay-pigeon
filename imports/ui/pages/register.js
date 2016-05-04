import './register.html';

Template.register.onCreated(function registerOnCreated() {
  console.log( "register onCreated" );

  // {{#if isInRole 'admin,editor' 'group1'}}
  const loggedInUser = Meteor.user();
  console.log( "loggedInUser", loggedInUser );
  // if( ! loggedInUser || ! Roles.userIsInRole( loggedInUser, ['admin'], 'default-group' ) )
  if( ! loggedInUser || ! loggedInUser.profile.isAdmin )
  {
    throw new Meteor.Error( 403, "Access denied" );
  }
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
    // const realname = target.registerRealName.value;
    const username = target.registerUserName.value;
    const password = target.registerPassword.value;
    const isAdmin = target.isAdmin.checked;

    // Meteor.call( 'accounts.insert', username, password, isAdmin );
    // console.log( "register user:", username, password, isAdmin );
    Accounts.createUser({
      username: username,
      password: password,
      // name: 'testing',
      profile: { admin: isAdmin }
    }, ( error ) => {
      if( ! error )
      {
        FlowRouter.go( '/' );
      }
    });

    // const roles = isAdmin ? ['admin'] : [];
    // Roles.addUsersToRoles( id, roles, 'default-group' );
  },

});
