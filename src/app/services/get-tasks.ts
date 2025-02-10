import { api } from "../libs/axios/api";
import { TaskType } from "../types/task-type";
import { delay } from "../utils/delay";

export async function getTasks() {
  try {
    await delay(2000);
    const { data } = await api.get<TaskType[]>("/tasks");
    return data;
  } catch (error) {
    throw error;
  }
}
