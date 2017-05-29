/// <reference path="../../../typings/modules/angular-mocks/index.d.ts" />
import {IPassword} from '../interfaces/interfaces';
import {IPasswordList} from '../interfaces/interfaces';

import * as angular from 'angular';
import * as _ from 'lodash';

// import * as db from './db.json';
let data:IPasswordList = [
  {
    "id": 0,
    "password": "Gmail",
    "label": "Gmail",
    "description": "Gmail password"
  },
  {
    "id": 1,
    "password": "Dropbox",
    "label": "Dropbox",
    "description": "Dropbox password"
  },
  {
    "id": 2,
    "password": "Card",
    "label": "Card",
    "description": "Card number"
  },
  {
    "id": 3,
    "password": "Drupal",
    "label": "Drupal",
    "description": "Drupal password"
  }
];

export default class Backend {
  private password_list:any;

  constructor($httpBackend: angular.IHttpBackendService, password_list:IPasswordList = data) {
    // Templates
    $httpBackend.whenGET(/^\/templates\/.*/).passThrough();

    // GET /password_list; returns all passwords.
    $httpBackend.whenGET('/password_list').respond(password_list);

    // GET /password/:id; returns password by id or 404 undefined.
    $httpBackend.whenGET(/\/password\/(\d+)/, undefined, ['id'])
      .respond(
        (method, url, data, headers, params) => {
          let id:number = parseInt(params.id);
          let password = _.find(password_list, {id: id});

          if(_.isUndefined(password)) {
            return [404, undefined, {}];
          }
          return [200, password, {}];
        }
      );

    // POST /password; returns all passwords.
    $httpBackend.whenPOST('/password')
      .respond(
        (method, url, data:string) => {
          let id = 0;
          if(password_list.length) {
            let max = _.maxBy(
              password_list,
              'id'
            );
            if(!_.isUndefined(max.id)) {
              id = max.id + 1;
            }
          }
          let password = angular.fromJson(data);
          password.id = id;
          password_list.push(password);
          return [200, password_list, {}];
        }
      );

    // PUT /password/:id; returns all passwords.
    $httpBackend.whenPUT(/\/password\/(\d+)/, undefined, undefined, ['id'])
      .respond(
        (method, url, data:string, headers, params) => {
          let id:number = parseInt(params.id);
          let password = angular.fromJson(data);
          let index = _.findIndex(
            password_list,
            {
              id: id
            }
          );
          password_list.splice(index, 1, password);
          return [200, password_list, {}];
        }
      );

    // DELETE /password/:id; returns all passwords.
    $httpBackend.whenDELETE(/\/password\/(\d+)/, undefined, ['id'])
      .respond(
        (method, url, data, headers, params) => {
          let id:number = parseInt(params.id);
          _.remove(
            password_list,
            {
              id: id
            }
          );
          return [200, password_list, {}];
        }
      );
  }

}
Backend.$inject = ['$httpBackend'];