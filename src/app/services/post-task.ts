import { api } from "../libs/axios/api";
import { TaskType } from "../types/task-type";

interface PostTaskProps {
  task: TaskType;
}

export async function postTask({ task }: PostTaskProps) {
  try {
    const { data } = await api.post("/tasks", task);
    return data;
  } catch (error) {
    throw error;
  }
}
