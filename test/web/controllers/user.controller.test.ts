import {assert} from 'chai';
import {Application, Router} from 'express';
import * as sinon from 'sinon';
import Injector from '../../../server/cross/injector';
import {UserDao} from '../../../server/dao/user.dao';

describe('API User', () => {

    var server;
    var request = require('request');
    var baseUrl = 'http://localhost:3000';
    var emailDefault = `${Date.now()}alfred@gmail.com`;

    before(() => {
        server = require('../../../bootstrap');
    });

    after(() => {
        var userDao = <UserDao>Injector.getRegistered("userDao");
        userDao.delete(emailDefault);
    });

    it('should not return sucess when email was not informed', (done) => {

        request.post(
            {
                url: baseUrl + '/api/v1/user'
            }, 
            (error, resp, body) => {            
                
                var bodyJson = JSON.parse(body);
                assert.isFalse(bodyJson.success);
                assert.equal("Email was not informed", bodyJson.error);
                done();
        });
    });

    it('should not return sucess when save a user invalid', (done) => {

        request.post(
            {
                url: baseUrl + '/api/v1/user',
                form: {
                    email: emailDefault
                }
            }, 
            (error, resp, body) => {            
                
                var bodyJson = JSON.parse(body);
                assert.isFalse(bodyJson.success);
                done();
        });
    });
    
    it('should return sucess when save the user', (done) => {

        request.post(
            {
                url: baseUrl + '/api/v1/user',
                form:{
                    name: 'alfred',
                    email: emailDefault,
                    birthday: '1985/11/25',
                    password: '123456'
                }
            }, 
            (error, resp, body) => {
            
                var bodyJson = JSON.parse(body);
                assert.isTrue(bodyJson.success);
                done();
        });
    });

    it('should not save a user with same email', (done) => {

        request.post(
            {
                url: baseUrl + '/api/v1/user',
                form:{
                    name: 'alfred',
                    email: emailDefault,
                    birthday: '1985/11/25',
                    password: '123456'
                }
            }, 
            (error, resp, body) => {
            
                var bodyJson = JSON.parse(body);
                assert.isFalse(bodyJson.success);
                done();
        });
    });

    it('should update user when email exists', (done) => {

        request.put(
            {
                url: baseUrl + '/api/v1/user',
                form:{
                    name: 'batman',
                    email: emailDefault,
                    birthday: '1990/01/01'
                }
            }, 
            (error, resp, body) => {
            
                var bodyJson = JSON.parse(body);
                assert.isTrue(bodyJson.success);
                done();
        });
    });

    it('should not update when email was not found', (done) => {

        request.put(
            {
                url: baseUrl + '/api/v1/user',
                form:{
                    name: 'batman',
                    email: 'aaa@aaa.com.py',
                    birthday: '1990/01/01'
                }
            }, 
            (error, resp, body) => {
            
                var bodyJson = JSON.parse(body);
                assert.isFalse(bodyJson.success);
                assert.equal("User was not found", bodyJson.error);
                done();
        });
    });
});