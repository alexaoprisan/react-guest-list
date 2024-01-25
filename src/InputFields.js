import { useState } from 'react';

export default function InputFields() {
  // 1. Create state variable
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      createGuest();
    }
  };

  const createGuest = () => {
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      const newGuest = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        attending: false, // Assuming guests are initially set as not attending
      };
      setGuests([...guests, newGuest]);
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <>
      {/* 2. Display state variable */}
      <h2>
        {firstName} {lastName}
      </h2>
      <input
        id="firstName"
        className="form-control"
        placeholder="first name"
        // 3. use state variable as value
        value={firstName}
        onChange={(event) => {
          // 4. Update state variable
          setFirstName(event.currentTarget.value);
        }}
      />
      <input
        id="lastName"
        className="form-control"
        placeholder="last name"
        // 3. use state variable as value
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        onKeyPress={handleKeyPress} // Trigger createGuest on "Enter" key press
      />

      <ul>
        {guests.map((guest, { index }) => (
          <li key={index}>
            {guest.firstName} {guest.lastName} -{' '}
            {guest.attending ? 'Attending' : 'Not Attending'}
          </li>
        ))}
      </ul>
    </>
  );
}
