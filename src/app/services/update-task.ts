import { api } from "../libs/axios/api";
import { TaskType } from "../types/task-type";
import { delay } from "../utils/delay";

interface UpdateTaskProps {
  task: TaskType;
}

export async function updateTask({ task }: UpdateTaskProps) {
  try {
    await delay(2000);
    const { data } = await api.patch(`/tasks/${task.id}`, task);
    return data;
  } catch (error) {
    throw error;
  }
}
