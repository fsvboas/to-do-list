import { api } from "../libs/axios/api";
import { delay } from "../utils/delay";

interface DeleteTaskProps {
  taskId: string;
}

export async function deleteTask({ taskId }: DeleteTaskProps) {
  try {
    await delay(2000);
    const { data } = await api.delete(`/tasks/${taskId}`);
    return data;
  } catch (error) {
    throw error;
  }
}
