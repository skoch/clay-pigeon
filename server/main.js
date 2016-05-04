import '../imports/api/users.js';
import '../imports/api/wine.js';
import '../imports/api/events.js';
// import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  // var basicAuth = new HttpBasicAuth( "guest", "password" );
  // basicAuth.protect();

  // if the database is empty on server start, create our admin user.
  if( Meteor.users.find().count() === 0 )
  {
    let id = Accounts.createUser({
      username: "admin",
      password: "8OdbESJMx7zyo51dC",
      profile: { name: "Admin" }
    });

    Roles.addUsersToRoles( id, ['admin'], 'default-group' );

  }
});
