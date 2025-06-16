
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Redirecionar para o HTML principal
    window.location.href = '/index.html';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecionando para MayconLog...</h1>
        <p className="text-xl text-muted-foreground">Sistema de entregas carregando</p>
      </div>
    </div>
  );
};

export default Index;
