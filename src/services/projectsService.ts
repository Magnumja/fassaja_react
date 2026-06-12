import { Project } from '@/types/project';
import { mockProjects } from '@/data/mockProjects';

let projects = [...mockProjects];

export const projectsService = {
  async getProjects(): Promise<Project[]> {
    return Promise.resolve(projects);
  },

  async getProjectById(id: string): Promise<Project | undefined> {
    return Promise.resolve(projects.find(project => project.id === id));
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: `proj-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    return Promise.resolve(newProject);
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined> {
    const index = projects.findIndex(project => project.id === id);
    if (index === -1) return undefined;

    projects[index] = { ...projects[index], ...updates };
    return Promise.resolve(projects[index]);
  },

  async deleteProject(id: string): Promise<boolean> {
    const index = projects.findIndex(project => project.id === id);
    if (index === -1) return Promise.resolve(false);

    projects.splice(index, 1);
    return Promise.resolve(true);
  },
};
