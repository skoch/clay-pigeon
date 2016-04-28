import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/layouts/header.js';
import '../../ui/pages/add-user.js';
import '../../ui/pages/view-user.js';
import '../../ui/pages/view-users.js';

// 404
import '../../ui/pages/page-not-found.js';

var exposed = FlowRouter.group({});

// Tracker.autorun(function() {
//   FlowRouter.watchPathChange();
//   var context = FlowRouter.current();
//   console.log( "context", context );
//   // use context to access the URL state

//   if( context.path )
//   {
//     $( '.tab' ).each( function( index, el )
//     {
//       $( this ).removeClass( 'active' );
//     });

//     var routeName = context.path.substring( 1 );
//     console.log( "routeName", routeName );
//     $( '.' + routeName ).addClass( 'active' );
//   }
// });

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render( 'appBody', { top: 'header', main: 'mainContent' } );
  },
});

FlowRouter.route('/add-user', {
  name: 'add-user',
  action() {
    BlazeLayout.render( 'appBody', { top: 'header', main: 'addUser' } );
  },
});

FlowRouter.route('/view-users', {
  name: 'view-users',
  action() {
    BlazeLayout.render( 'appBody', { top: 'header', main: 'viewUsers' } );
  },
});

FlowRouter.route('/view-user/:userId', {
  name: 'view-user',
  action() {
    BlazeLayout.render( 'appBody', { top: 'header', main: 'viewUser' } );
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render( 'appBody', { main: 'notFound' } );
  },
};


