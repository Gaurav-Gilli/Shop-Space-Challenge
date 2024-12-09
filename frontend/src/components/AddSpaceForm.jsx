import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import PropTypes from "prop-types";

const AddSpaceForm = ({
  name, type, capacity, pricePerUnit,
  setName, setType, setCapacity, setPricePerUnit,
  onSave, onCancel
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(); 
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
        Save Space
      </Button>
      <Button onClick={onCancel} color="secondary" variant="outlined" sx={{ marginTop: 2, marginLeft: 1 }}>
        Cancel
      </Button>
    </form>
  );
};

AddSpaceForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  capacity: PropTypes.string.isRequired,
  pricePerUnit: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setCapacity: PropTypes.func.isRequired,
  setPricePerUnit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default AddSpaceForm;
