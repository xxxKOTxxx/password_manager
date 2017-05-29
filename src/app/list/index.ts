import * as angular from 'angular';
import ListCtrl from './ListCtrl';

export const ListModule: ng.IModule = angular.module('ListModule', [])
  .controller('ListCtrl', ListCtrl);