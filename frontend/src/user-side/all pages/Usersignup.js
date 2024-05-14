import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    userid: '',
    coordinates: [[0, 0]], // Initial coordinates
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'latitude' || e.target.name === 'longitude') {
      const index = parseInt(e.target.dataset.index);
      const updatedCoordinates = [...formData.coordinates];
      updatedCoordinates[index][parseInt(e.target.name === 'latitude' ? 0 : 1)] = parseFloat(e.target.value);
      setFormData({ ...formData, coordinates: updatedCoordinates });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/createuser', formData);
      console.log(res.data); // Handle success response
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors[0].msg);
      } else if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong');
      }
    }
  };

  const addCoordinate = () => {
    setFormData({
      ...formData,
      coordinates: [...formData.coordinates, [0, 0]] // Adding a new coordinate with initial values
    });
  };

  return (
    <div>
      <h2>Create User</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>User ID:</label>
          <input type="text" name="userid" value={formData.userid} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Coordinates:</label>
          {formData.coordinates.map((coordinate, index) => (
            <div key={index}>
              <input
                type="number"
                name="latitude"
                placeholder="Latitude"
                value={coordinate[0]}
                data-index={index}
                onChange={handleChange}
              />
              <input
                type="number"
                name="longitude"
                placeholder="Longitude"
                value={coordinate[1]}
                data-index={index}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="button" onClick={addCoordinate}>Add Coordinate</button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
