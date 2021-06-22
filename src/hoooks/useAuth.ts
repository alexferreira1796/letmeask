import React from 'react';
import { AuthContext } from '../contexts/auth';

export function useAuth() {
  return React.useContext(AuthContext);
}