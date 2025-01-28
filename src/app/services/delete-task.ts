import { api } from "../libs/axios/api";

interface DeleteTaskProps {
  taskId: string;
}

export async function deleteTask({ taskId }: DeleteTaskProps) {
  try {
    const { data } = await api.delete(`/tasks/${taskId}`);
    return data;
  } catch (error) {
    throw error;
  }
}
