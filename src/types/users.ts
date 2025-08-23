import { Id } from '@/convex/_generated/dataModel';

export interface User {
  _id: Id<'users'>;
  _creationTime: number;
  email: string;
  name: string;
  image?: string;
  role: 'admin' | 'user' | 'manager';
  companyId: Id<'companies'>;
}

export interface UserCreateData {
  email: string;
  name: string;
  image?: string;
  role: 'admin' | 'user' | 'manager';
  companyId: string;
}

export interface UserUpdateData extends Partial<UserCreateData> {}