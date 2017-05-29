import * as _ from 'lodash';
import {IPassword, IAPIService} from "../interfaces/interfaces";

export default class EditCtrl {
  static $inject = ["$scope", "$location", "$routeParams", 'APIService'];
  private ready: boolean = false;
  private id?: number|null;
  private password: IPassword;
  private empty_password: IPassword = {
    password: '',
    label: '',
    description: ''
  };

  constructor(
    protected $scope: ng.IScope,
    protected $location: ng.ILocationService,
    protected $routeParams: ng.route.IRouteParamsService,
    protected api: IAPIService
  ) {
    this.id =  _.isUndefined(this.$routeParams.id) ? null : parseInt(this.$routeParams.id);
    if(this.id === null) {
      let label = _.isUndefined(this.$routeParams.label) ? '' : this.$routeParams.label;
      let password = this.empty_password;
      password.label = label;
      this.setPassword(this.empty_password);
    }
    else {
      this.api.get(this.id).then(
        (data) => {
          this.setPassword(data);
        }
      );
    }
  }

  setPassword(password: IPassword) {
    this.password = password;
    this.ready = true;
  }

  cancel() {
    this.$location.path(`/`);
  }


  save(form):void {
    if(form.$valid) {
      if(_.isNull(this.id)) {
        this.api.create(this.password).then(
          (data) => {
            this.$location.path(`/`);
          }
        );
      }
      else {
        this.api.update(this.password).then(
          (data) => {
            this.$location.path(`/`);
          }
        );
      }
    }
  }
}