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
    data?: T;
    dateTime?: Date;
    statusCode: number | string;
  }
  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    content?: T;
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
    items: Iitems;
  }
  interface IBook {
    item_id: number;
    user_id: number;
    number: number;
    date_on: Date;
    date_out: Date;
    notice: string;
  }
  interface IItemBooked {
    id: number;
    item_id: number;
    user_id: number;
    number: number;
    date_on: Date;
    date_out: Date;
    notice: string;
    items: Iitems;
    users: IUser;
    confirm: boolean;
  }
  interface IAddCart {
    id: number;
    item_id: number;
    user_id: number;
    number: number;
    items: Iitems;
    users: IUser;
  }
  interface IPhoto {
    id: number;
    item_id: number;
    photo_1: string;
    photo_2: string;
    photo_3: string;
    photo_4: string;
    photo_5: string;
  }
  interface IReqUser {
    book_id: number;
    date_on: Date;
    date_out: Date;
    notice: string;
    number: number;
  }
}
