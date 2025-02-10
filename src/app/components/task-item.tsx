"use client";

import { useMutation } from "@tanstack/react-query";
import { Check, Loader2, Pencil, Trash2, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { queryClient } from "../libs/tanstack-query";
import { deleteTask, updateTask } from "../services";
import { TaskType } from "../types/task-type";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Show } from "./utils/show";

interface TaskItemProps {
  task: TaskType;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isEdittingTaskItem, setIsEdittingTaskItem] = useState<boolean>(false);
  const [value, setValue] = useState<string>(task.name);

  const { mutate: update, isPending: pendingUpdateTask } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient?.invalidateQueries({ queryKey: ["tasks"] });
      setIsEdittingTaskItem(false);
    },
  });

  const { mutate: del, isPending: pendingDeleteTask } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient?.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  const handleUpdateTaskItem = (task: TaskType) => {
    update({ task: { id: task.id, name: value } });
  };

  const handleDeleteTaskItem = (task: TaskType) => {
    del({ taskId: task?.id });
  };

  useEffect(() => {
    if (isEdittingTaskItem) {
      inputRef.current?.focus();
    }
  }, [isEdittingTaskItem]);

  return (
    <div className="flex flex-row items-center justify-between w-full h-14 bg-gray-100 rounded-md border p-4">
      <Show
        when={!isEdittingTaskItem}
        fallback={
          <div className="flex flex-row justify-between items-center w-full">
            <Input
              ref={inputRef}
              type="text"
              disabled={pendingUpdateTask}
              value={value}
              onChange={handleChangeInputValue}
              className="max-w-[69%] border-none focus:!ring-0 shadow-none !text-base pl-0"
            />
            <div className="flex flex-row space-x-2">
              <Button
                type="button"
                className="max-w-10 bg-green-600 hover:bg-green-500"
                onClick={() => handleUpdateTaskItem(task)}
              >
                {pendingUpdateTask ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Check className="text-white" />
                )}
              </Button>
              <Button
                type="button"
                className="max-w-10 bg-gray-300 hover:bg-gray-200"
                onClick={() => setIsEdittingTaskItem(false)}
                disabled={pendingUpdateTask}
              >
                <XIcon className="text-black" />
              </Button>
            </div>
          </div>
        }
      >
        <p>{task?.name}</p>
        <div className="flex flex-row space-x-2">
          <Button
            type="button"
            className="max-w-10 bg-gray-300 hover:bg-gray-200"
            disabled={false}
            onClick={() => setIsEdittingTaskItem(true)}
          >
            <Pencil className="text-black" />
          </Button>
          <Button
            type="button"
            className="max-w-10 bg-red-700 hover:bg-red-600"
            disabled={pendingDeleteTask}
            onClick={() => handleDeleteTaskItem(task)}
          >
            {pendingDeleteTask ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash2 />
            )}
          </Button>
        </div>
      </Show>
    </div>
  );
};

export default TaskItem;
