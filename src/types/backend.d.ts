import { IUser } from "./next-auth";

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
    data?: T;
    dateTime?: Date;
  }
  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    content?: T | [];
  }
  interface ITypeItem {
    id: number;
    type_name: string;
    icons: string;
  }
  interface Iitems {
    id: number;
    name_item: string;
    number: number;
    photo: string;
    price: number;
    description: string;
    type_id: number;
  }
  interface ICmt {
    id: number;
    item_id: number;
    user_id: number;
    date_on: Date;
    content: string;
    rate: number;
    users: IUser;
  }
  interface ILike {
    item_id: number;
    user_id: number;
    date_like: Date;
    quantity: boolean;
  }
}
