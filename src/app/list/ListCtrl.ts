import * as _ from 'lodash';
import {IPasswordList} from '../interfaces/interfaces';
import {IAPIService} from '../interfaces/interfaces';


export default class ListCtrl {
  static $inject = ["$scope", "$location", 'APIService'];
  private search:string = '';
  private password_list: IPasswordList = [];
  private filtered_list: IPasswordList = [];
  private labels_list: string[];
  private ready: boolean = false;

  constructor(
    protected $scope: ng.IScope,
    protected $location: ng.ILocationService,
    protected api: IAPIService
  ) {
    this.api.getList().then(
      (data) => {
        this.password_list = data;
        this.setData();
      }
    );
  }

  setData() {
    this.filtered_list = this.password_list;
    this.labels_list = _.map(
      this.password_list,
      'label'
    );
    this.ready = true;
  }

  get search_list():string[] {
    return this.labels_list.filter(
      (item)=> {
        return item.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) + 1;
      }
    );
  }

  private filter(): void {
    this.filtered_list = this.password_list.filter(
      (item)=> {
        return item.label.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) + 1;
      }
    );
  }

  private create(label?:string):void {
    if(_.isUndefined(label)) {
      label = '';
    }
    this.$location.path(`/create/${label}`);
  }

  private edit(id:number):void {
    this.$location.path(`/edit/${id}`);
  }

  private remove(id:number):void {
    this.api.remove(id).then(
      (data) => {
        this.password_list = data.data;
        this.setData();
      }
    );
  }
}