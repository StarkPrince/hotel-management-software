import { FastifyInstance } from "fastify";
import { roomService } from "../services/roomService";

export async function roomRoutes(fastify: FastifyInstance) {
  fastify.get("/api/rooms", async () => {
    return await roomService.getAllRooms();
  });

  fastify.get("/api/rooms/:id", async (request: any) => {
    return await roomService.getRoomById(request.params.id);
  });

  fastify.post("/api/rooms", async (request: any) => {
    return await roomService.createRoom(request.body);
  });

  fastify.put("/api/rooms/:id", async (request: any) => {
    return await roomService.updateRoom(request.params.id, request.body);
  });
}
