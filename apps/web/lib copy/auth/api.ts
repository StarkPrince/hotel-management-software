import { AuthResult, User } from './types';
import mockDb from '@/data/mock-db.json';
import { getStoredUser, setStoredUser } from './static-auth';

export async function loginApi(email: string, password: string): Promise<AuthResult> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockDb.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    setStoredUser(userWithoutPassword);
    return { user: userWithoutPassword };
  } catch (error: any) {
    return { 
      error: error.message || 'Login failed'
    };
  }
}

export async function logoutApi(): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 500));
  setStoredUser(null);
  return true;
}

export async function getCurrentUser(): Promise<User | null> {
  return getStoredUser();
}