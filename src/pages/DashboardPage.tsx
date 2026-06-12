import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ProgressCard } from '@/components/dashboard/ProgressCard';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useTasks } from '@/hooks/useTasks';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { mockUser } from '@/data/mockUser';

const DashboardPage: React.FC = () => {
  const { tasks, completeTask, deleteTask } = useTasks();
  const stats = useDashboardStats(tasks);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const upcomingTasks = tasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  const getProgressMessage = () => {
    const { completionRate } = stats;
    if (completionRate === 100) return 'Tudo concluído! Você venceu o dia.';
    if (completionRate >= 75) return 'Você está arrasando nas suas tarefas! 💪';
    if (completionRate >= 50) return 'Bom progresso! Vamos continuar?';
    if (completionRate > 0) return 'Cada tarefa conta. Continue!';
    return 'Nenhuma tarefa concluída ainda. Vamos começar?';
  };

  return (
    <AppLayout onNewTask={() => setShowNewTaskModal(true)}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Olá, {mockUser.name}! 👋
        </h1>
        <p className="text-text-secondary">
          Que bom te ver por aqui. Vamos ser produtivos hoje?
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total de Tarefas"
          value={stats.total}
          icon={<ListTodo size={24} />}
          color="#2477FF"
          comparison={{
            value: 12,
            isPositive: true,
            period: 'semana passada',
          }}
        />
        <MetricCard
          title="Concluídas"
          value={stats.completed}
          icon={<CheckCircle size={24} />}
          color="#22C55E"
          comparison={{
            value: 18,
            isPositive: true,
            period: 'semana passada',
          }}
        />
        <MetricCard
          title="Em Andamento"
          value={stats.inProgress}
          icon={<Clock size={24} />}
          color="#FBBF24"
          comparison={{
            value: 5,
            isPositive: false,
            period: 'semana passada',
          }}
        />
        <MetricCard
          title="Atrasadas"
          value={stats.overdue}
          icon={<AlertCircle size={24} />}
          color="#F43F5E"
          comparison={{
            value: 2,
            isPositive: false,
            period: 'semana passada',
          }}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Progress */}
        <div className="lg:col-span-1">
          <ProgressCard
            percentage={stats.completionRate}
            label="Conclusão Geral"
            message={getProgressMessage()}
          />
        </div>

        {/* Upcoming Tasks */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-bold text-text-primary mb-4">
              Próximas Tarefas
            </h3>
            {upcomingTasks.length > 0 ? (
              <div className="space-y-3">
                {upcomingTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✨</div>
                <p className="text-text-secondary">
                  Nenhuma tarefa pendente! Você está em dia.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick actions */}
        <Card>
          <h3 className="text-lg font-bold text-text-primary mb-4">
            Atalhos Rápidos
          </h3>
          <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-start">
              ➕ Nova Tarefa
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              📁 Novo Projeto
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              📊 Ver Relatórios
            </Button>
          </div>
        </Card>

        {/* Help */}
        <Card className="bg-gradient-to-br from-primary-light to-blue-50">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🤖</div>
            <div>
              <h3 className="text-lg font-bold text-primary-dark mb-2">
                Precisa de ajuda?
              </h3>
              <p className="text-sm text-primary-dark opacity-80 mb-4">
                Fale conosco no chat de suporte. Estamos aqui para ajudar!
              </p>
              <Button size="sm" variant="primary">
                Fale conosco
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
