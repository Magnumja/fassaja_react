import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4">
      <Card className="text-center py-16 max-w-md">
        <div className="text-8xl mb-6">😕</div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          404
        </h1>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Página não encontrada
        </h2>
        <p className="text-text-secondary mb-8">
          Ops! Essa página se perdeu no caminho. A página que você tentou acessar não existe ou foi movida.
        </p>
        <Button onClick={() => navigate('/')}>
          Voltar para o Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default NotFoundPage;
