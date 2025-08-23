import { GenericDataModel } from "convex/server";

declare global {
  namespace ConvexLuciaAuth {
    interface DataModel extends GenericDataModel {
      users: {
        document: {
          _id: string;
          _creationTime: number;
          email: string;
          name: string;
          image?: string;
          role: "admin" | "user" | "manager";
          companyId: string;
        };
        fieldPaths: 
          | "_id" 
          | "_creationTime" 
          | "email" 
          | "name" 
          | "image" 
          | "role" 
          | "companyId";
        indexes: {
          by_email: {
            email: string;
          };
          by_company: {
            companyId: string;
          };
        };
        searchIndexes: {};
        vectorIndexes: {};
      };
      auth_sessions: {
        document: any;
        fieldPaths: any;
        indexes: {};
        searchIndexes: {};
        vectorIndexes: {};
      };
      auth_keys: {
        document: any;
        fieldPaths: any;
        indexes: {};
        searchIndexes: {};
        vectorIndexes: {};
      };
      [tableName: string]: {
        document: any;
        fieldPaths: any;
        indexes: any;
        searchIndexes: any;
        vectorIndexes: any;
      };
    }
  }
}

export {};