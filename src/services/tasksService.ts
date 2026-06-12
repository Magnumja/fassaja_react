import { Task } from '@/types/task';
import { mockTasks } from '@/data/mockTasks';

let tasks = [...mockTasks];

export const tasksService = {
  async getTasks(): Promise<Task[]> {
    return Promise.resolve(tasks);
  },

  async getTaskById(id: string): Promise<Task | undefined> {
    return Promise.resolve(tasks.find(task => task.id === id));
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return Promise.resolve(newTask);
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined> {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return undefined;

    tasks[index] = { ...tasks[index], ...updates };
    return Promise.resolve(tasks[index]);
  },

  async deleteTask(id: string): Promise<boolean> {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return Promise.resolve(false);

    tasks.splice(index, 1);
    return Promise.resolve(true);
  },

  async completeTask(id: string): Promise<Task | undefined> {
    return this.updateTask(id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
    });
  },

  async getTasksByProject(projectId: string): Promise<Task[]> {
    return Promise.resolve(tasks.filter(task => task.projectId === projectId));
  },

  async getTasksByStatus(status: Task['status']): Promise<Task[]> {
    return Promise.resolve(tasks.filter(task => task.status === status));
  },
};
