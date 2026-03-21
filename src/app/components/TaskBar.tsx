import { Plus } from "lucide-react";
import { TaskItem } from "./TaskItem";
import { Progress } from "./ui/progress";

export interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  duration: number; // in minutes
  date: string; // ISO date string
}

interface TaskBarProps {
  title: string;
  type: "workload" | "health";
  percentage: number;
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: () => void;
}

export function TaskBar({
  title,
  type,
  percentage,
  tasks,
  onToggleTask,
  onDeleteTask,
  onAddTask,
}: TaskBarProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const barColor = type === "workload" ? "bg-blue-500" : "bg-green-500";
  const barGradient = type === "workload" 
    ? "from-blue-500 to-blue-600" 
    : "from-green-500 to-green-600";

  return (
    <div className="flex flex-col h-full">
      {/* Percentage Indicator */}
      <div className="text-center mb-3">
        <div className={`text-4xl font-bold ${type === "workload" ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"}`}>
          {percentage}%
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{title}</div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Progress value={percentage} className="h-3" indicatorClassName={`bg-gradient-to-r ${barGradient}`} />
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500 italic">
            No tasks available
          </div>
        ) : (
          Object.entries(groupedTasks).map(([category, categoryTasks]) => (
            <div key={category} className="space-y-1">
              <div className="w-full text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide px-2 py-1">
                {category}
              </div>
              
              {/* Today's tasks */}
              {categoryTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                  type={type}
                />
              ))}
            </div>
          ))
        )}
      </div>

      {/* Add Task Button */}
      <button
        onClick={onAddTask}
        className={`mt-4 w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition-opacity bg-gradient-to-r ${barGradient}`}
      >
        <Plus className="w-5 h-5" />
        Add Task
      </button>
    </div>
  );
}