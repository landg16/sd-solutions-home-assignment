import React, { useMemo } from 'react';
import type { Task } from '../types/task';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, MoreVertical, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { cn, generateRandomCircles } from '@/lib/utils.ts';
import { Label } from '@/components/ui/label';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: 'pending' | 'completed') => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  high: 'bg-red-100 text-red-800 hover:bg-red-100',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete, onEdit, isUpdating, isDeleting }) => {
  const isCompleted = task.status === 'completed';

  const circles = useMemo(() => generateRandomCircles(), []);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-finch-200 p-4 transition-all h-full',
        isCompleted ?? 'opacity-80',
        isDeleting && 'opacity-50 pointer-events-none'
      )}
    >
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50 dark:bg-black/50">
          <Loader2 className="h-8 w-8 animate-spin text-destructive" />
        </div>
      )}

      {circles.map((circle) => (
        <div
          key={circle.id}
          className='absolute rounded-full border border-finch-400 pointer-events-none'
          style={{
            width: `${circle.size}rem`,
            height: `${circle.size}rem`,
            top: `${circle.top}%`,
            right: `${circle.right}%`,
            transform: 'translate(50%, -50%)',
            opacity: circle.opacity,
          }}
        />
      ))}

      <div className='relative z-10 flex flex-col h-full'>
        <div className='flex justify-between items-start'>
          <div className='flex items-start gap-3'>
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin mt-1 text-finch-600" />
            ) : (
              <Checkbox
                id={task.id}
                checked={isCompleted}
                onCheckedChange={(checked: boolean) =>
                  onStatusChange(task.id, checked ? 'completed' : 'pending')
                }
                className='mt-1 border-finch-600 data-[state=checked]:bg-finch-600 data-[state=checked]:text-finch-50'
              />
            )}
            <div className='space-y-1'>
              <Label
                htmlFor={task.id}
                className={cn(
                  'text-xl font-bold tracking-tight text-finch-950',
                  isCompleted ? 'line-through opacity-70' : '',
                )}
              >
                {task.title}
              </Label>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 rounded-full bg-finch-950/10 hover:bg-finch-950/20 text-finch-900'
              >
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='bg-finch-50 border-finch-200'>
              <DropdownMenuItem
                onClick={() => onEdit(task.id)}
                className='focus:bg-finch-100 text-finch-700 cursor-pointer focus:text-finch-400'
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer'
                onClick={() => onDelete(task.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex mb-4 mt-2'>
          <div className='flex gap-2'>
            <Badge
              variant='secondary'
              className={cn(priorityColors[task.priority], 'border-transparent')}
            >
              {task.priority}
            </Badge>
            {task.dueDate && (
              <Badge
                variant='outline'
                className='flex items-center gap-1 border-finch-400 text-finch-800 bg-finch-100/50'
              >
                <CalendarIcon className='h-3 w-3' />
                {new Date(task.dueDate).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </div>

        <div className='grow'>
          {task.description && (
            <p className='text-sm text-finch-800 line-clamp-3 mb-4 font-medium'>
              {task.description}
            </p>
          )}
        </div>

        <div className='mt-auto pt-4 flex justify-between items-center text-xs text-finch-700 font-medium border-t border-finch-300/50'>
          <div className='flex items-center gap-1'>
            <Clock className='h-3 w-3' />
            <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
          <div
            className={cn(
              'px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider',
              isCompleted ? 'bg-green-100 text-green-700' : 'bg-finch-300 text-finch-900',
            )}
          >
            {task.status}
          </div>
        </div>
      </div>
    </div>
  );
};
