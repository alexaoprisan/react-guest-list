import React, { useState } from 'react';

export default function InputFields() {
  // 1. Create state variables for first name, last name, and guest list
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);

  // Function to create a new guest
  const createGuest = () => {
    // Check if both first name and last name are not empty
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      // Create a new guest object with trimmed first name, last name, and default attending status
      const newGuest = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        attending: false, // Guests are initially set as not attending
      };
      // Add the new guest to the guest list
      setGuests([...guests, newGuest]);
      // Clear the input fields for first name and last name
      setFirstName('');
      setLastName('');
    }
  };

  // Function to handle keyboard "Enter" key press
  const handleKeyPress = (event) => {
    // Check if the "Enter" key is pressed
    if (event.key === 'Enter') {
      // Call the function to create a new guest
      createGuest();
    }
  };

  // Function to handle guest deletion
  const deleteGuest = (index) => {
    // Create a copy of the current guest list
    const updatedGuests = [...guests];
    // Remove the guest at the specified index from the copy of the guest list
    updatedGuests.splice(index, 1);
    // Update the guest list state with the modified guest list
    setGuests(updatedGuests);
  };

  return (
    <div>
      {/* Input field for first name */}
      <input
        className="form-control"
        placeholder="first name"
        value={firstName}
        onChange={(event) => {
          // Update the state with the typed first name
          setFirstName(event.currentTarget.value);
        }}
      />

      {/* Input field for last name */}
      <input
        className="form-control"
        placeholder="last name"
        value={lastName}
        onChange={(event) => setLastName(event.currentTarget.value)}
        // Call the function to create a new guest when "Enter" key is pressed
        onKeyPress={handleKeyPress}
      />

      {/* List of guests */}
      <ul>
        {guests.map((guest, index) => (
          // Wrap each guest in a div with a key and a data-test-id attribute
          <div key={index} data-test-id="guest">
            {/* List item for each guest */}
            <li>
              {/* Display guest's first name, last name, and attending status */}
              {guest.firstName} {guest.lastName} -{' '}
              {guest.attending ? 'Attending' : 'Not Attending'}
              {/* Button to remove the guest */}
              <button onClick={() => deleteGuest(index)}>Remove</button>{' '}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
