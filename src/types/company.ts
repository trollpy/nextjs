import { Id } from '@/convex/_generated/dataModel';

export interface Company {
  _id: Id<'companies'>;
  _creationTime: number;
  name: string;
  logo?: string;
  ownerId: Id<'users'>;
  createdAt: number;
}

export interface CompanyWithOwner extends Company {
  owner: any; // User type
}

export interface CompanyCreateData {
  name: string;
  logo?: string;
  ownerId: string;
}

export interface CompanyUpdateData {
  name?: string;
  logo?: string;
}