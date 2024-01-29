import React, { useEffect, useState } from 'react';

export default function InputFields() {
  // 1. Create state variables for first name, last name, and guest list
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl =
    'https://e052a8a3-1f83-4276-a71d-9978ca69a4ef-00-183lv9icupxvs.janeway.replit.dev';

  // useEffect hook to fetch initial guest data BUT IDK IF THIS WORKS????

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      // setIsLoading(false); // Set loading state to false

      // Fetch data from the API
      const response = await fetch(
        `${baseUrl}/guests`,

        // body: JSON.stringify({ firstName: firstName, lastName: lastName }), // Body containing empty first and last name
      );
      // Parse response data as JSON
      const allGuests = await response.json();

      // Set guests state with fetched data
      setGuests(allGuests);
      setIsLoading(false); // Set loading state to true after data is fetched
    };
    // Call fetchData function when component mounts
    fetchData().catch(console.error); // Catch any errors and log them to the console
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  if (isLoading) {
    return 'Loading...';
  }

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
  const deleteGuest = async (index) => {
    const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
    const deletedGuest = await response.json();
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
                  onChange={(event) => {
                    const updatedGuests = [...guests]; // Create a copy of the guests array
                    updatedGuests[index].attending =
                      event.currentTarget.checked; // Update the attending status of the guest at the current index
                    setGuests(updatedGuests); // Update the state with the modified guest list
                  }}
                />
                {/* Display whether the guest is attending or not */}
                {guest.attending ? 'Attending' : 'Not Attending'}
                {/* Button to remove the guest */}
                <button onClick={() => deleteGuest(index)}>Remove</button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
