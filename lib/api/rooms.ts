import { z } from 'zod';
import { RoomTypeEnum, RoomStatusEnum } from '@/lib/types';

const RoomSchema = z.object({
  number: z.string(),
  type: RoomTypeEnum,
  status: RoomStatusEnum,
  floor: z.number(),
  price: z.number(),
});

export async function getRooms() {
  const response = await fetch('http://localhost:3001/api/rooms');
  const data = await response.json();
  return data;
}

export async function createRoom(room: unknown) {
  const validatedRoom = RoomSchema.parse(room);
  const response = await fetch('http://localhost:3001/api/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedRoom),
  });
  return response.json();
}