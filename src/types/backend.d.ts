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
    data: T;
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

  interface IUpdateUserPayload {
    name?: string;
    phone?: string;
    address?: string;
    gender?: string;
    dateOfBirth?: Date;
    roleIds?: number[];
    isActive?: boolean;
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

  interface IImage {
    id: number;
    url: string;
    description: string;
  }

  interface ISpecies {
    id: number;
    name: string;
    scientific_name?: string;
    description?: string;
    conservation_status?: string;
  }

  interface IEnclosure {
    id: number;
    name: string;
    location: string;
    capacity: number;
  }

  interface IAnimals {
    id: number;
    name: string;
    birth_date: string;
    gender: string;
    health_status: string;
    created_at: string;
    updated_at: string;
    species: ISpecies;
    enclosure: IEnclosure;
    images: IImage[];
  }

  interface IUpdateAnimalPayload {
    name?: string;
    birth_date?: string;
    gender?: string;
    health_status?: string;
    species_id?: number;
    enclosure_id?: number;
    files?: File[];
    replaceImages?: boolean;
  }

  interface IProduct {
    id: number;
    name: string;
    description?: string;
    stock: number;
    status: string;
    created_at: string;
    updated_at: string;
    animal: IAnimals | null;
  }

  interface IProductItem {
    id: number;
    title: string;
    basePrice: number;
    description: string;
    code: string;
    stock: number;
    created_at?: string;
    updated_at?: string;
    product: IProduct;
    images: IImage[];
  }

  interface IUpdateProductItemPayload {
    title?: string;
    basePrice?: number;
    description?: string;
    code?: string;
    stock?: number;
    productId?: number;
    files?: File[];
    replaceImages?: boolean;
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

  interface IUpdateEnclosurePayload {
    name?: string;
    location?: string;
    capacity?: number;
  }

  interface IUpdateSpeciesPayload {
    name?: string;
    scientific_name?: string;
    description?: string;
    conservation_status?: string;
  }

  interface IUpdateProductPayload {
    name?: string;
    description?: string;
    stock?: number;
    status?: string;
    animal_id?: number;
  }
}
