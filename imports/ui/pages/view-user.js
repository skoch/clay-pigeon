import { Users } from '../../api/users.js';

import './view-user.html';

Template.viewUser.onCreated(function viewUserOnCreated() {
  console.log( "viewUser onCreated" );
});

Template.viewUser.onRendered(function viewUserOnRendered() {
  console.log( "viewUser onRendered" );
});

Template.viewUser.helpers({
  user() {
    const task = Users.findOne( userId );
  },

});
