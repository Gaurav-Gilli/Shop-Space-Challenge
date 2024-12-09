import { useState } from "react";
import { Typography, Box, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useSpaces } from "./hooks/useSpaces";
import SpaceList from "./components/SpaceList";
import AddSpaceForm from "./components/AddSpaceForm";
import EditSpaceForm from "./components/EditSpaceForm";
import axios from 'axios'; 

function App() {
  const { spaces, loading, addSpace, editSpace, deleteSpace } = useSpaces();
  const [editSpaceData, setEditSpaceData] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false); 
  const [openEditDialog, setOpenEditDialog] = useState(false); 

  // Manage form data for the new space
  const [name, setName] = useState("");
  const [type, setType] = useState("hanger");
  const [capacity, setCapacity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSaveEdit = async (updatedSpace) => {
    try {
      // Make a PUT request to update the space
      const response = await axios.put(`http://localhost:5000/api/spaces/${updatedSpace.id}`, updatedSpace);
      editSpace(response.data.space); 
      setOpenEditDialog(false); 
    } catch (error) {
      console.error("Error updating space:", error);
    }
  };

  const handleCancelEdit = () => {
    setOpenEditDialog(false); // Close the edit form dialog without saving
  };

  const handleSaveAdd = async () => {
    const newSpace = {
      name,
      type,
      capacity: parseInt(capacity),
      price_per_unit: parseFloat(pricePerUnit),
    };

    try {
      // Make a POST request to save the new space
      const response = await axios.post('http://localhost:5000/api/spaces', newSpace);

      // If successful, add the new space to the state
      addSpace(response.data.space); 
      setOpenAddDialog(false);
    } catch (error) {
      console.error('Error saving space:', error);
    }
  };

  const handleCancelAdd = () => {
    setOpenAddDialog(false); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/spaces/${id}`);
      deleteSpace(id); 
    } catch (error) {
      console.error("Error deleting space:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        minHeight: "100vh",
        backgroundColor: "#121212", 
        maxWidth:"100%",
        overflowX: "hidden", 
      }}
    >
      <Typography variant="h4" gutterBottom color="white">
        Shop Space Management
      </Typography>

      {/* Button to open Add Space dialog */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddDialog(true)} // Open the Add Space dialog
      >
        Add New Space
      </Button>


      <Grid container spacing={3} justifyContent="center" sx={{ overflowX: "hidden" }}>
        <SpaceList spaces={spaces} onEdit={(space) => { setEditSpaceData(space); setOpenEditDialog(true); }} onDelete={handleDelete} />
      </Grid>

      {/* Add Space Dialog */}
      <Dialog open={openAddDialog} onClose={handleCancelAdd}>
        <DialogTitle>Add New Space</DialogTitle>
        <DialogContent>
          <AddSpaceForm
            name={name}
            type={type}
            capacity={capacity}
            pricePerUnit={pricePerUnit}
            setName={setName}
            setType={setType}
            setCapacity={setCapacity}
            setPricePerUnit={setPricePerUnit}
            onSave={handleSaveAdd}
            onCancel={handleCancelAdd}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAdd} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveAdd} color="primary">
            Save Space
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Space Dialog */}
      <Dialog open={openEditDialog} onClose={handleCancelEdit}>
        <DialogTitle>Edit Space</DialogTitle>
        <DialogContent>
          {editSpaceData && (
            <EditSpaceForm
              space={editSpaceData}
              onSave={handleSaveEdit} // Save edit and close
              onCancel={handleCancelEdit} // Close without saving
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleSaveEdit(editSpaceData)} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
