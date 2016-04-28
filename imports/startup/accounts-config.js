import { Accounts } from 'meteor/accounts-base';

// usernames instead of email
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
