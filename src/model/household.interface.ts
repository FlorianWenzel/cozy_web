export interface Household {
  id: string;
  name: string;
  password: string;
  users: any[];
  recipes: any[];
  units: any[];
  items: any[];
  createdAt: Date;
  updatedAt: Date;
}
