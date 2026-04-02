export interface IUserRole {
  id: number;
  name: string; // USER | BANK_ADMIN | SUPER_ADMIN
  permissions?: any[];
  tenantCode?: string;
}

export interface ITenant {
  id: number;
  name: string;
  code?: string;
  domain?: string;
  slogan?: string | null;
  image?: string | null;
  location?: string | null;
  address?: string | null;
  branch?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  color?: string | null;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: IUserRole;
  tenant: ITenant;
  active: boolean;
  locked: boolean;
  firstLogin: boolean;
  userActivated: boolean;
  createdAt: string;
  updatedAt: string;
  passwordHash?: string;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

export interface IPaginatedUsers {
  content: IUser[];
  pageable: any;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  empty: boolean;
}

export interface IGetAllUsersResponse {
  status: string;
  message: string;
  data: IPaginatedUsers;
  code: string;
  date: string;
}

export interface IUsersSummaryResponse {
  status: string;
  message: string;
  code: string;
  date: string;
  data: {
    users: number;
    bankAdmin: number;
    superAdmin: number;
  };
}

export interface IBankAdmin {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
}

export interface IBank {
  id: number;
  name: string;
  code: string;
  address: string;
  image: string | null;
  location: string;
  branch: string;
  isActive: boolean;
  bankAdmins: IBankAdmin[];
}

export interface IBanksResponse {
  content: IBank[];
  total_banks: number;
}

export interface IBankAdmin {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
}

export interface IBank {
  id: number;
  name: string;
  code: string;
  address: string;
  image: string | null;
  location: string;
  branch: string;
  isActive: boolean;
  bankAdmins: IBankAdmin[];
}

export interface IBanksSearchResponse {
  content: IBank[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}