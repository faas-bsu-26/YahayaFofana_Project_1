import { Checkbox } from "./ui/checkbox";
import { Task } from "./TaskBar";
import { X } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  type: "workload" | "health";
  isWeekly?: boolean;
}

export function TaskItem({ task, onToggle, onDelete, type }: TaskItemProps) {
  const bgColor = type === "workload" 
    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" 
    : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg border ${bgColor} cursor-pointer hover:shadow-sm transition-shadow`}
      onClick={() => onToggle(task.id)}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        id={`task-${task.id}`}
        className="flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <label
          htmlFor={`task-${task.id}`}
          className={`block text-sm cursor-pointer ${
            task.completed
              ? "line-through text-gray-400 dark:text-gray-600"
              : "text-gray-700 dark:text-gray-200"
          }`}
        >
          {task.title}
        </label>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {task.duration} min
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(task.id);
        }}
        className="h-7 w-7 flex-shrink-0 rounded-full flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        aria-label={`Remove ${task.title}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}