"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { queryClient } from "../libs/tanstack-query";
import { getTasks, postTask } from "../services";
import { TaskType } from "../types/task-type";
import TaskItem from "./task-item";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { SkeletonPlaceholder } from "./ui/skeleton-placeholder";
import { Show } from "./utils/show";

const ToDoListCard = () => {
  const [value, setValue] = useState<string>("");

  const { data, isPending: pendingGetTasks } = useQuery({
    queryFn: () => getTasks(),
    queryKey: ["tasks"],
  });

  const { mutate: post, isPending: pendingPostTask } = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient?.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {},
  });

  const tasks = data || [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handlePostTask = (task: TaskType) => {
    post({ task });
    setValue("");
  };

  const uniqueId = Date.now().toString();

  const listPlaceholder = Array.from({ length: 5 }, (_, index) => (
    <SkeletonPlaceholder key={index} className="w-full h-14" />
  ));

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>To-Do List</CardTitle>
        <CardDescription>Create, update and delete your tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Create a new task"
            disabled={pendingPostTask}
            value={value}
            onChange={handleChange}
            maxLength={30}
          />
          <Button
            type="submit"
            className="min-w-20"
            disabled={pendingPostTask || value === ""}
            onClick={() => handlePostTask({ id: uniqueId, name: value })}
          >
            {pendingPostTask ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full space-y-2">
          <Show when={!pendingGetTasks} fallback={listPlaceholder}>
            {tasks.map((item, index) => (
              <TaskItem key={index} task={item} />
            ))}
          </Show>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ToDoListCard;
