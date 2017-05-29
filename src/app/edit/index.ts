import * as angular from 'angular';
import EditCtrl from './EditCtrl';

export const EditModule: ng.IModule = angular.module('EditModule', [])
  .controller('EditCtrl', EditCtrl);