import { api } from "../libs/axios/api";
import { TaskType } from "../types/task-type";
import { delay } from "../utils/delay";

interface PostTaskProps {
  task: TaskType;
}

export async function postTask({ task }: PostTaskProps) {
  try {
    await delay(2000);
    const { data } = await api.post("/tasks", task);
    return data;
  } catch (error) {
    throw error;
  }
}
