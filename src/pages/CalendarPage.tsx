import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/common/Card';

const CalendarPage: React.FC = () => {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold text-text-primary mb-8">Calendário</h1>
      <Card className="text-center py-16">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Página em desenvolvimento
        </h2>
        <p className="text-text-secondary">
          Em breve você verá suas tarefas de forma visual no calendário!
        </p>
      </Card>
    </AppLayout>
  );
};

export default CalendarPage;
