import React, { useEffect, useState } from 'react';

export default function InputFields() {
  // 1. Create state variables for first name, last name, and guest list
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl =
    'https://e052a8a3-1f83-4276-a71d-9978ca69a4ef-00-183lv9icupxvs.janeway.replit.dev';

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      // Fetch data from the API
      const response = await fetch(`${baseUrl}/guests`);
      // Parse response data as JSON
      const allGuests = await response.json();

      // Set guests state with fetched data
      setGuests(allGuests);
      setIsLoading(false); // Set loading state to true after data is fetched
    };
    // Call fetchData function when component mounts
    fetchData().catch(console.error); // Catch any errors and log them to the console
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Function to create a new guest

  const createGuest = async () => {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
    // Check if both first name and last name are not empty
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      // Create a new guest object with trimmed first name, last name, and default attending status
      const newGuest = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        attending: false,
      };
      // Add the new guest to the guest list
      setGuests([...guests, newGuest]);
      // Clear the input fields for first name and last name
      setFirstName('');
      setLastName('');
    }
  };

  // Function to handle keyboard "Enter" key press
  const handleKeyPress = async (event) => {
    // Check if the "Enter" key is pressed
    if (event.key === 'Enter') {
      // Call the function to create a new guest
      await createGuest();
    }
  };

  // Function to handle guest deletion
  const deleteGuest = async (id) => {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    // Create a copy of the current guest list
    const updatedGuests = guests.filter(
      (guest) => guest.id !== deletedGuest.id,
    );

    // Update the guest list state with the modified guest list
    setGuests(updatedGuests);
  };

  if (isLoading) {
    return 'Loading...';
  }

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
        {guests.map((guest, index) => {
          // Wrap each guest in a div with a key and a data-test-id attribute
          return (
            <div key={`user-${guest.id}`} data-test-id="guest">
              {/* List item for each guest */}
              <li>
                {/* Display the guest's first name and last name */}
                {guest.firstName} {guest.lastName} -{' '}
                {/* Checkbox to toggle attending status */}
                <input
                  type="checkbox"
                  // Connect the state variable to the form fields
                  checked={guest.attending}
                  // Update the values of the state variables based on user input
                  onChange={async (event) => {
                    const updatedGuests = [...guests]; // Create a copy of the guests array
                    updatedGuests[index].attending =
                      event.currentTarget.checked; // Update the attending status of the guest at the current index
                    setGuests(updatedGuests); // Update the state with the modified guest list

                    // Send a PUT request to update the attending status of the guest in the API
                    const guestIdToUpdate = updatedGuests[index].id; // Assuming each guest object has an 'id' property
                    await fetch(`${baseUrl}/guests/${guestIdToUpdate}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        attending: event.currentTarget.checked,
                      }),
                    });
                  }}
                />
                {/* Display whether the guest is attending or not */}
                {guest.attending ? 'Attending' : 'Not Attending'}
                {/* Button to remove the guest */}
                <button onClick={() => deleteGuest(guest.id)}>Remove</button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
