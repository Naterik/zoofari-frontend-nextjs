export {};

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data: T; // Changed from T[] to T to handle both single objects and arrays
    meta?: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  }

  interface IRole {
    id: number;
    name: string;
    description: string;
  }

  interface IUserRole {
    id: number;
    userId: number;
    roleId: number;
    role: IRole;
  }

  interface IUserModel {
    id: number;
    name: string;
    email: string;
    phone: string;
    userRoles: IUserRole[];
    address?: string;
    gender?: string;
    dateOfBirth?: Date;
    password?: string;
    isActive?: boolean;
    accountType?: string;
    role?: string;
  }

  interface ILogin {
    user: {
      id: string;
      name: string;
      email: string;
      roles: string[];
    };
    access_token: string;
  }

  interface IRegister {
    id: string;
    name: string;
    code: string;
    password: string;
    confirmPassword: string;
    email: string;
  }

  interface IProductModel {
    id: number;
    name: string;
    description: string;
    animal: string;
    image: string;
  }

  interface IProductItemsModel {
    id: number;
    titile: string;
    basePrice: number;
    decription: string;
    image: string;
    product: string;
  }

  interface IOrders {
    id: number;
    orderDate: Date;
    totalAmount: number;
    status: string;
  }

  interface IOrderDetails {
    id: number;
    order: string;
    productItem: string;
    productItemOption: string;
  }

  interface INews {
    id: number;
    titile: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface IEvents {
    id: number;
    titile: string;
    description: string;
    startDate: Date;
    endDate: Date;
    ticket?: string;
  }

  interface IAnimals {
    id: number;
    name: string;
    age: number;
    description: string;
    categories: string;
    habitats: string;
    conservations: string;
  }
}
