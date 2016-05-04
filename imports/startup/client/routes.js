import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Users } from '../../api/users.js';
import { Wine } from '../../api/wine.js';
import { Events } from '../../api/events.js';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/layouts/header.js';
import '../../ui/pages/login.js';
import '../../ui/pages/register.js';
import '../../ui/pages/add-user.js';
import '../../ui/pages/view-user.js';
import '../../ui/pages/view-users.js';
import '../../ui/pages/add-wine.js';
import '../../ui/pages/view-wine.js';
import '../../ui/pages/view-wines.js';
import '../../ui/pages/add-event.js';
import '../../ui/pages/view-event.js';
import '../../ui/pages/view-events.js';

// 404
import '../../ui/pages/page-not-found.js';

var admin = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  // triggersEnter: [function( context, redirect, stop ){
  //   const loggedInUser = Meteor.user();
  //   console.log( "loggedInUser", loggedInUser );
  //   if( loggedInUser && Roles.userIsInRole( loggedInUser, ['admin'], 'default-group' ) )
  //   {
  //   }
  // }],
});

admin.route('/register', {
  name: 'register',
  // triggersEnter( context, redirect ){
  //   const loggedInUser = Meteor.user();
  //   console.log( "loggedInUser", loggedInUser );
  // },
  action() {
    BlazeLayout.render( 'appBody', { top: 'header', main: 'register' } );
  }
});

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

// FlowRouter.route('/login', {
//   name: 'login',
//   action() {
//     BlazeLayout.render( 'appBody', { main: 'login' } );
//   },
// });

FlowRouter.route('/', {
  name: 'home',
  triggersEnter( context, redirect ){
    redirect( '/view-wines' );
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
    console.log( "user", user );
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

FlowRouter.route('/view-events', {
  name: 'view-events',
  action() {
    BlazeLayout.render( 'appBody', { top: 'header', main: 'viewEvents' } );
  },
});

FlowRouter.route('/e/:_id', {
  name: 'view-event',
  triggersEnter( context, redirect, stop ) {
    var event = Events.findOne( context.params._id );
    if( ! event )
    {
      redirect( '/view-events' );
    }else
    {
      BlazeLayout.render( 'appBody', { top: 'header', main: 'viewEvent', event: event } );
      stop();
    }
  },
  triggersExit( context, redirect ) {
    // hack to remove the Chosen dropdown from the DOM
    // $( '#user-list' ).chosen( 'destroy' );
    $( '#user_list_chzn' ).remove();
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render( 'appBody', { main: 'notFound' } );
  },
};


