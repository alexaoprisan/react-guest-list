Todo List: Guest List App Development
Adding a Guest:

[] Implement functionality to add a guest using separate first name and last name fields.
[] Ensure the first name input has a related label containing "First name".
[] Ensure the last name input has a related label containing "Last name".
[] Enable creating a guest upon pressing the "Return" key in the last name input.
[] Clear both fields after creating a guest.
[] Set newly created guests as not attending by default.
[] Encapsulate each guest (content and form fields) inside a <div> element with the attribute data-test-id="guest".

Deleting a Guest:

[] Provide functionality to delete a guest.
[] Implement a button for deleting guests.
[] Ensure the button contains the text "Remove".
Alternatively, use an aria-label attribute starting with "Remove" (e.g., "Remove <first name> <last name>").

Setting Guest Attendance:

[] Enable users to set a guest as "attending" by clicking on a checkbox.
[] Ensure the checkbox has an aria-label containing the text "attending" (e.g., "<first name> <last name> attending status").
[] Implement functionality to toggle the attendance status of guests.
[] On the first click of the attending checkbox, set the guest to attending (check the checkbox).
[] On the second click of the attending checkbox, set the guest to not attending (uncheck the checkbox).

API Integration:

[] Set up the provided API for storing and retrieving data.
[] Save any changes made to the guest list to the API.
[] Retrieve and load the guest list from the API.

Initial Loading State:

[] Implement loading state handling when initially loading the guest list from the API on page load.
[] Display a loading message containing the text "Loading...".
[] Disable the form fields while the guest list is being loaded.
