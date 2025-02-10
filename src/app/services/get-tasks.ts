import { api } from "../libs/axios/api";
import { TaskType } from "../types/task-type";

export async function getTasks() {
  try {
    const { data } = await api.get<TaskType[]>("/tasks");
    return data;
  } catch (error) {
    throw error;
  }
}
