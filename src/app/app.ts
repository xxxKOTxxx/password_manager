import * as angular from 'angular';
import 'angular-route';
import 'angular-resource';
import 'angular-mocks';

import 'angular-aria';
import 'angular-animate';
import 'angular-bootstrap';
import 'angular-loading-bar';
import 'angular-material';

import {Routes} from './routes'
import {Material} from './material'

import './list/index';
import './edit/index';
import APIService from './services/api'
import Backend from './backend/backend'

module App {
    angular.module('app.services', []);
    export const app: ng.IModule = angular.module(
      'app',
      [
        'ngRoute',
        'ngResource',
        'ngMockE2E',
        'app.services',
        'ngMaterial',
        'ListModule',
        'EditModule'
      ]
    )
      .config(Routes)
      .config(Material)
      .service('APIService', APIService)
      .run(Backend);

}