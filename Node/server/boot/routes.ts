import express from "express";

module.exports = (app: any)=>{
    const path = '/api/v1';

    require('../api/common')(app, path); // route: /api/v1/
}
