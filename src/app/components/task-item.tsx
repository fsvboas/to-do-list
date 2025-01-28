"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { queryClient } from "../libs/tanstack-query";
import { deleteTask } from "../services";
import { TaskType } from "../types/task-type";
import { Button } from "./ui/button";

interface TaskItemProps {
  task: TaskType;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { mutate: del, isPending: pendingDeleteTask } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient?.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDeleteUser = (task: TaskType) => {
    del({ taskId: task?.id });
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-14 bg-gray-100 rounded-md border p-4">
      <p>{task?.name}</p>
      <div className="flex flex-row space-x-2">
        <Button
          type="button"
          className="max-w-10 bg-gray-300 hover:bg-gray-200"
          disabled={false}
          onClick={() => null}
        >
          <Pencil className="text-black" />
        </Button>
        <Button
          type="button"
          className="max-w-10 bg-red-700 hover:bg-red-600"
          disabled={pendingDeleteTask}
          onClick={() => handleDeleteUser(task)}
        >
          {pendingDeleteTask ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash2 />
          )}
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
