// Template.registerHelper( 'updateNav', ( routeName ) => {
//   console.log( "routeName", routeName );

//   $( '.tab' ).each( function( index, el )
//   {
//     $( this ).removeClass( 'active' );
//   });

//   $( '.' + routeName ).addClass( 'active' );
// });

Template.registerHelper( 'arrayify',( obj ) => {
  result = [];
  for( var key in obj ) result.push( { name:key, value:obj[key] } );
  return result;
});

import '/imports/startup/accounts-config.js';
import '/imports/startup/client';

// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

// import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
