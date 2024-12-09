import PropTypes from "prop-types";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const SpaceList = ({ spaces, onEdit, onDelete }) => {
  if (spaces.length === 0) {
    return (
      <Typography
        sx={{ fontSize: "1.5rem", marginTop: 5, color:"white", textAlign:"center" }} 
        align="center" 
      >
        No spaces available.
      </Typography>
    );
  }

  return (
    <>
      {spaces.map((space) => (
        <Grid item xs={12} sm={6} md={3} key={space.id}>
          <Card sx={{ backgroundColor: "#333", color: "#fff", marginTop: 5 }}>
            <CardContent>
              <Typography variant="h6">{space.name}</Typography>
              <Typography>Type: {space.type}</Typography>
              <Typography>Capacity: {space.capacity}</Typography>
              <Typography>Occupied: {space.occupied ? "Yes" : "No"}</Typography>
              <Typography>Price per unit: ${space.price_per_unit}</Typography>
              <Button
                onClick={() => onEdit(space)}
                variant="outlined"
                color="primary"
                sx={{ marginTop: 1 }}
              >
                Edit
              </Button>
              <Button
                onClick={() => onDelete(space.id)}
                variant="outlined"
                color="secondary"
                sx={{ marginTop: 1, marginLeft: 1 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

SpaceList.propTypes = {
  spaces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      capacity: PropTypes.number.isRequired,
      occupied: PropTypes.bool.isRequired, 
      price_per_unit: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SpaceList;
