export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'GUEST';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  error?: never;
}

export interface AuthError {
  error: string;
  user?: never;
}

export type AuthResult = AuthResponse | AuthError;