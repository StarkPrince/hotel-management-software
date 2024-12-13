import useSWR from 'swr';
import { getRooms } from '@/lib/api/rooms';

export function useRooms() {
  const { data, error, isLoading } = useSWR('/api/rooms', getRooms);

  return {
    rooms: data,
    isLoading,
    isError: error,
  };
}