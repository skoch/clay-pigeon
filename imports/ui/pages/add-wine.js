import { Wine } from '../../api/wine.js';

import './add-wine.html';

const wineFields = [
  { id: "name", label: "Name", value: "Some Name" },
  { id: "vintage", label: "Vintage", value: "2014" },
  { id: "style", label: "Style", value: "Pinot" },
  { id: "bottle-price", label: "Bottle Price", value: "25" },
];

Template.addWine.onCreated(function addWineOnCreated() {
  console.log( "addWine onCreated" );
});

Template.addWine.onRendered(function addWineOnRendered() {
  console.log( "addWine onRendered" );
  Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );
});

Template.addWine.helpers({
  fields() {
    return wineFields;
  },

});

Template.addWine.events({
  'submit form'( event )
  {
    var isError = false;
    event.preventDefault();

    $.each( wineFields, function( index, val )
    {
      let input = $( '#' + val.id );
      let inputDiv = input.parent( '.input' );
      inputDiv.removeClass( 'error' );

      if( input.val() == '' )
      {
        console.log( "error at", input );
        inputDiv.addClass( 'error' );

        isError = true;
      }else
      {
        // store the data on our existing object
        wineFields[index].value = input.val();
      }
    });

    // console.log( "DATA", wineFields );

    if( ! isError )
    {
      // Insert wine into the collection
      Meteor.call( 'wine.insert', wineFields );

      // Clear form
      $.each( wineFields, function( index, val )
      {
        let input = $( '#' + val.id );
        input.val( '' );
      });
    }

  },

});
