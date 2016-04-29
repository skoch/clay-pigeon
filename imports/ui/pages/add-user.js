import { Users } from '../../api/users.js';

import '../labeled-input.js';
import './add-user.html';

const userFields = [
  // { id: "first-name", label: "First Name", value: "Stephen" },
  // { id: "last-name", label: "Last Name", value: "Koch" },
  // { id: "address", label: "Address", value: "123 Main St." },
  // { id: "city", label: "City", value: "Anytown" },
  // { id: "state", label: "State", value: "NY" },
  // { id: "zip", label: "Zip", value: "12345" },
  // { id: "phone", label: "Phone", value: "123.456.7890" },
  // { id: "email", label: "Email", value: "email@address.com" },
  { id: "first-name", label: "First Name" },
  { id: "last-name", label: "Last Name" },
  { id: "address", label: "Address" },
  { id: "city", label: "City" },
  { id: "state", label: "State" },
  { id: "zip", label: "Zip" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
];

Template.addUser.onCreated(function addUserOnCreated() {
  console.log( "addUser onCreated" );
});

Template.addUser.onRendered(function addUserOnRendered() {
  console.log( "addUser onRendered" );
  Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );
});

Template.addUser.helpers({
  fields() {
    // const instance = Template.instance();
    // return Tasks.find({}, { sort: { createdAt: -1 } });

    return userFields;
  },

  // incompleteCount() {
  //   return Tasks.find({ checked: { $ne: true } }).count();
  // },

});

Template.addUser.events({
  'submit form'( event )
  {
    // const instance = Template.instance();
    var isError = false;
    // Prevent default browser form submit
    event.preventDefault();

    // console.log( "userFields", userFields );

    $.each( userFields, function( index, val )
    {
      let input = $( '#' + val.id );
      let inputDiv = input.parent( '.input' );
      inputDiv.removeClass( 'error' );
      // inputDiv.next( '.text-error' ).addClass( 'hide' );

      if( input.val() == '' )
      {
        console.log( "error at", input );
        inputDiv.addClass( 'error' );
        // inputDiv.next( '.text-error' ).removeClass( 'hide' ).html( 'WTF' );

        isError = true;
        // return false;
      }else
      {
        // store the data on our existing object
        userFields[index].value = input.val();
      }
    });

    // console.log( "DATA", userFields );

    // Get value from form element
    // const target = event.target;
    // const text = target.text.value;

    if( ! isError )
    {
      // Insert a user into the collection
      Meteor.call( 'wineclub-users.insert', userFields );

      // Clear form
      $.each( userFields, function( index, val )
      {
        let input = $( '#' + val.id );
        input.val( '' );
      });
    }

  },

});
