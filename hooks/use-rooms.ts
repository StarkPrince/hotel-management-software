import axios from "axios";
import { useEffect, useState } from "react";

export const useRooms = () => {
  const [rooms, setRooms] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/rooms");
        setRooms(response.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const updateRoom = async (roomId: string, data: any) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/rooms/${roomId}`,
        data
      );
      setRooms(
        rooms.map((room: any) => (room.id === roomId ? response.data : room))
      );
      return response.data;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  return { rooms, isLoading, error, updateRoom };
};
