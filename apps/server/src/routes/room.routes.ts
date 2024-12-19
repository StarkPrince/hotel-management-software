import { FastifyPluginAsync } from "fastify";
import RoomController from "../controller/room.controller";

const roomRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api/rooms", {
    handler: RoomController.getAllRooms,
  });

  fastify.get("/api/rooms/:id", {
    handler: RoomController.getRoomById,
  });

  fastify.post("/api/rooms", {
    handler: RoomController.createRoom,
  });

  fastify.put("/api/rooms/:id", {
    handler: RoomController.updateRoom,
  });
};

export default roomRoutes;
