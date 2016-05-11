import { Accounts } from 'meteor/accounts-base';

// usernames instead of email
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

// https://blog.tableflip.io/flow-router-some-useful-patterns/
Accounts.onLogin(() => {
  console.log( "Accounts.onLogin", FlowRouter.current().route.group.name );
  if( FlowRouter.current().route.group.name === 'public' )
  {
    FlowRouter.go( 'view-wines' );
  }
});
