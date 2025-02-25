export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

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
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ILogin {
    user: {
      id: string;
      name: string;
      email: string;
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
  interface IUserModel {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    gender: string;
    dateOfBirth: Date;
    password: string;
    isActive: Boolean;
    accountType: string;
    role: string;
  }
  interface ITicketModel {
    id: number;
    event: string;
    user: string;
    price: number;
    status: string;
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
  interface IProductItemOptionsModel {
    id: number;
    titile: string;
    additionPrice: number;
    optionDecription: string;
    productItem: string;
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
  interface IAniaml {
    id: number;
    name: string;
    age: number;
    description: string;
    categories: string;
    habitats: string;
    conservations: string;
  }
}
