import React from 'react';
import { Navigate } from 'react-router';

export type GuardrailProps = {
  canAccess: boolean;
  redirectTo: string;
  children: React.ReactNode;
};

const Guardrail: React.FC<GuardrailProps> = ({
  canAccess,
  redirectTo,
  children,
}) => {
  if (!canAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default Guardrail;
