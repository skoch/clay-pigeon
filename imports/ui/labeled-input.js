import './labeled-input.html';

Template.labeledInput.onCreated(function labeledInputOnCreated() {
  console.log( "labeledInput onCreated" );
});

Template.labeledInput.onRendered(function labeledInputOnRendered() {
  console.log( "labeledInput onRendered" );
});

Template.labeledInput.helpers({
  labelIs( val ) {
    // const instance = Template.instance();
    // return Tasks.find({}, { sort: { createdAt: -1 } });

    return val === 'first-name';
  },

});

