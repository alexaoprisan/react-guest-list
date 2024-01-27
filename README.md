# The Guest List React App is a web application developed using React. It allows users to create and manage a guest list for events or gatherings. Users can add guests with separate first name and last name fields, set their attendance status, and delete guests as needed.

Add guests with separate first name and last name fields.
Set guest attendance status as "attending" or "not attending".
Delete guests from the guest list.
Integration with a provided API for data storage and retrieval.

## The project exists to provide a simple and intuitive solution for managing guest lists in event planning. Unlike other similar projects, this app offers a clean and focused user interface tailored specifically for managing guest lists, making it easy to use for event organizers and hosts without unnecessary complexity.

### The Guest List React App was created by Johanna-Maria-Alexandra Oprisan.

#### The project achieves its features through React, leveraging its component-based architecture to create reusable and modular UI components. Data management and communication with the backend API are handled using React's state management and asynchronous data fetching capabilities.

##### The software runs as a web application on any compatible web browser, accessible from desktop computers, laptops, tablets, and mobile devices. Users can interact with the application through a graphical user interface served via a web server or hosted online.

Todo List: Guest List App Development
Adding a Guest:

[X] Implement functionality to add a guest using separate first name and last name fields.
[X] Ensure the first name input has a related label containing "First name".
[X] Ensure the last name input has a related label containing "Last name".
[X] Enable creating a guest upon pressing the "Return" key in the last name input.
[X] Clear both fields after creating a guest.
[X] Set newly created guests as not attending by default.
[x] Encapsulate each guest (content and form fields) inside a <div> element with the attribute data-test-id="guest".

Deleting a Guest:

[x] Provide functionality to delete a guest.
[x] Implement a button for deleting guests.
[x] Ensure the button contains the text "Remove".
Alternatively, use an aria-label attribute starting with "Remove" (e.g., "Remove <first name> <last name>").

Setting Guest Attendance:

[x] Enable users to set a guest as "attending" by clicking on a checkbox.
[x] Ensure the checkbox has an aria-label containing the text "attending" (e.g., "<first name> <last name> attending status").
[x] Implement functionality to toggle the attendance status of guests.
[x] On the first click of the attending checkbox, set the guest to attending (check the checkbox).
[x] On the second click of the attending checkbox, set the guest to not attending (uncheck the checkbox).

API Integration:

[] Set up the provided API for storing and retrieving data.
[] Save any changes made to the guest list to the API.
[] Retrieve and load the guest list from the API.

Initial Loading State:

[] Implement loading state handling when initially loading the guest list from the API on page load.
[] Display a loading message containing the text "Loading...".
[] Disable the form fields while the guest list is being loaded.
