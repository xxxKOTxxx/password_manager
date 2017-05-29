
export interface IPassword {
  id?: number
  password: string
  label: string
  description?: string
}

export interface IPasswordList extends Array<IPassword> {}


export interface IAPIService {
    getList(): ng.IPromise<IPasswordList>;
    get(id: number): ng.IPromise<IPassword>;
    create(password: IPassword): ng.IPromise<IPassword>;
    update(password: IPassword): ng.IPromise<IPassword>;
    remove(id: number): ng.IPromise<any>;
}