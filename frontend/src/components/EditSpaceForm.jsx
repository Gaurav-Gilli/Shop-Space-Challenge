import { useState } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios"; // Adjust path as needed
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const EditSpaceForm = ({ space, onSave, onCancel }) => {
  const [name, setName] = useState(space.name);
  const [type, setType] = useState(space.type);
  const [capacity, setCapacity] = useState(space.capacity);
  const [pricePerUnit, setPricePerUnit] = useState(space.price_per_unit);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated space data
    const updatedSpace = {
      ...space,
      name,
      type,
      capacity: parseInt(capacity),
      price_per_unit: parseFloat(pricePerUnit),
    };

    try {
      const response = await axios.put(`/spaces/${space.id}`, updatedSpace);
      console.log("Updated space response:", response.data.space);
      if (response.status === 200) {
        console.log("Passing updated space to parent:", response.data.space);
        onSave(response.data.space); 
      }
    } catch (err) {
      console.error("Error updating space:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Type"
          fullWidth
        >
          <MenuItem value="hanger">Hanger</MenuItem>
          <MenuItem value="shelf">Shelf</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Capacity"
        variant="outlined"
        type="number"
        fullWidth
        margin="normal"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />

      <TextField
        label="Price per Unit"
        variant="outlined"
        type="number"
        fullWidth
        margin="normal"
        value={pricePerUnit}
        onChange={(e) => setPricePerUnit(e.target.value)}
        required
      />

      <Button type="submit" color="primary" variant="contained" sx={{ marginTop: 2 }}>
        Save Changes
      </Button>
      <Button onClick={onCancel} color="secondary" variant="outlined" sx={{ marginTop: 2, marginLeft: 1 }}>
        Cancel
      </Button>
    </form>
  );
};

EditSpaceForm.propTypes = {
  space: PropTypes.object.isRequired, 
  onSave: PropTypes.func.isRequired, 
  onCancel: PropTypes.func.isRequired, 
};

export default EditSpaceForm;
