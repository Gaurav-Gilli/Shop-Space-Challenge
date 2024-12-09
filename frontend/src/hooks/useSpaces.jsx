
import { useState, useEffect } from "react";
import axios from "../api/axios";

export const useSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/spaces")
      .then((response) => {
        setSpaces(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching spaces:", error);
        setSpaces([]);
        setLoading(false);
      });
  }, []);

  const addSpace = (newSpace) => {
    setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
  };

  const editSpace = (updatedSpace) => {
    const updatedSpaces = spaces.map((space) =>
      space.id.toString() === updatedSpace.id.toString() ? { ...space, ...updatedSpace } : space
    );
    setSpaces(updatedSpaces);
  };

  const deleteSpace = (id) => {
    setSpaces((prevSpaces) => prevSpaces.filter((space) => space.id !== id));
  };

  return { spaces, loading, addSpace, editSpace, deleteSpace };
};
