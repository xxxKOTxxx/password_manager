import {IPassword, IPasswordList, IAPIService} from '../interfaces/interfaces';

export default class APIService implements IAPIService {

  private httpService: ng.IHttpService;
  private qService: ng.IQService;

  static $inject = ['$http', '$q'];
  constructor($http: ng.IHttpService, $q: ng.IQService) {
      this.httpService = $http;
      this.qService = $q;
  }

  getList(): ng.IPromise<IPasswordList> {
    let self = this;
    let deferred = self.qService.defer();

    self.httpService.get('/password_list')
      .then(
        (result: any) => {
          deferred.resolve(result.data);
        },
        (error) => {
            deferred.reject(error);
        });

      return deferred.promise;
  }

  get(id: number): ng.IPromise<IPassword> {
    let self = this;
    let deferred = self.qService.defer();

    self.httpService.get(`/password/${id}`)
      .then(
        (result: any) => {
          deferred.resolve(result.data);
        },
        (error) => {
            deferred.reject(error);
        });

      return deferred.promise;
  }

  create(password: IPassword): ng.IPromise<IPassword> {
    let self = this;
    let deferred = self.qService.defer();

    self.httpService.post('/password', password)
      .then(
        (result: any) => {
          deferred.resolve(result.data);
        },
        (error) => {
            deferred.reject(error);
        });

      return deferred.promise;
  }

  update(password: IPassword): ng.IPromise<IPassword> {
    let self = this;
    let deferred = self.qService.defer();

    self.httpService.put(`/password/${password.id}`, password)
      .then(function (data) {
          deferred.resolve(data);
      }, function (error) {
          deferred.reject(error);
      });

    return deferred.promise;
  }

  remove(id:number): ng.IPromise<any> {
    let self = this;
    let deferred = self.qService.defer();

    self.httpService.delete(`/password/${id}`)
      .then(function (data) {
          deferred.resolve(data);
      }, function (error) {
          deferred.reject(error);
      });

    return deferred.promise;
  }
}
