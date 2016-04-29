import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Users } from '../../api/users.js';
import { Wine } from '../../api/wine.js';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/layouts/header.js';
import '../../ui/pages/login.js';
import '../../ui/pages/add-user.js';
import '../../ui/pages/view-user.js';
import '../../ui/pages/view-users.js';
import '../../ui/pages/add-wine.js';
import '../../ui/pages/view-wine.js';
import '../../ui/pages/view-wines.js';
import '../../ui/pages/add-event.js';

// 404
import '../../ui/pages/page-not-found.js';

// var exposed = FlowRouter.group({});

// exposed.route('/login', {
//   name: 'home',
//   action() {
//     BlazeLayout.render( 'appBody', { main: 'login' } );
//   }
// });

// var loggedin = FlowRouter.group({
//   prefix: '/admin',
//   name: 'admin',
//   triggersEnter: [function(context, redirect) {
//     console.log('running group triggers');
//   }]
// });

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

// FlowRouter.triggers.enter( [checkLoginState], { except: ['home'] } );

// function checkLoginState( context, redirect )
// {
//   if( ! Meteor.userId() )
//   {
//     redirect( '/' );
//   }
// };

FlowRouter.route('/', {
  name: 'home',
  triggersEnter( context, redirect ){
    redirect( '/view-users' );
  },
  // triggersEnter: [function( context, redirect ) {
  //   redirect( '/view-users' );
  // }],
  // action( _params ) {
  //   throw new Error("this should not get called");
  // }
  // action() {
  //   if( Meteor.userId() )
  //   {
  //     redirect( '/view-users' );
  //   }else
  //   {
  //     BlazeLayout.render( 'appBody', { main: 'login' } );
  //   }
  //   BlazeLayout.render( 'appBody', { top: 'header', main: 'view-users' } );
  // },
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

FlowRouter.route('/u/:_id', {
  name: 'view-user',
  triggersEnter( context, redirect, stop ) {
    var user = Users.findOne( context.params._id );
    // console.log( "user", user );
    if( ! user )
    {
      redirect( '/view-users' );
    }else
    {
      BlazeLayout.render( 'appBody', { top: 'header', main: 'viewUser', user: user } );
      stop();
    }
  },
  // action( params ) {
  //   console.log( "We don't even need this? _id", params._id );
  //   // BlazeLayout.render( 'appBody', { top: 'header', main: 'viewUser', user: user } );
  // },
});

FlowRouter.route('/add-wine', {
  name: 'add-wine',
  action() {
    BlazeLayout.render( 'appBody', { top: 'header', main: 'addWine' } );
  },
});

FlowRouter.route('/view-wines', {
  name: 'view-wines',
  action() {
    BlazeLayout.render( 'appBody', { top: 'header', main: 'viewWines' } );
  },
});

FlowRouter.route('/w/:_id', {
  name: 'view-wine',
  triggersEnter( context, redirect, stop ) {
    var wine = Wine.findOne( context.params._id );
    // console.log( "wine", wine );
    if( ! wine )
    {
      redirect( '/view-wines' );
    }else
    {
      BlazeLayout.render( 'appBody', { top: 'header', main: 'viewWine', wine: wine } );
      stop();
    }
  },
});

FlowRouter.route('/add-event', {
  name: 'add-event',
  action() {
    // var users = Users.find();
    BlazeLayout.render( 'appBody', { top: 'header', main: 'addEvent' } );
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render( 'appBody', { main: 'notFound' } );
  },
};


