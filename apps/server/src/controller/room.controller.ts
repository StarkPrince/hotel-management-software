import { FastifyReply, FastifyRequest } from "fastify";
import { validateRequest } from "../middleware/validateRequest";
import { RoomZodSchema } from "../schemas";
import { roomService } from "../services/room.service";

class RoomController {
  getAllRooms = async (request: any) => {
    const user = request.user as any;
    return await roomService.getAllRooms();
  };

  getRoomById = async (request: any) => {
    return await roomService.getRoomById(request.params.id);
  };

  createRoom = async (request: FastifyRequest, reply: FastifyReply) => {
    validateRequest(RoomZodSchema)(request, reply);
    reply.status(201).send(await roomService.createRoom(request.body));
  };

  updateRoom = async (request: FastifyRequest, reply: FastifyReply) => {
    validateRequest(RoomZodSchema)(request, reply);
    // @ts-ignore
    return await roomService.updateRoom(request.params.id, request.body);
  };
}

export default new RoomController();
