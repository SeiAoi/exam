import {fetch} from './fetch';

// 测试新后端
export const test = (data) => fetch.get('/user/users/test' , data);

// 用户登陆
export const login = (data) => fetch.post('/user/login/login' , data);

// 获取当前用户信息
export const getNowUser = (data) => fetch.get('/user/users/getNowUser' , data);

// 添加试题
export const addSubject = (data) => fetch.post('/user/exam/addSubject' , data);

// 查询所有试题类型
export const getSubjectType = (data) => fetch.get('/user/exam/getSubjectType' , data);

// 返回所有的试题类型包括类下题目的数量
export const getAllSubjectType = (data) => fetch.get('/user/exam/getAllSubjectType' , data);

// 获取某类型下所有试题
export const getSomeSubjects = (data) => fetch.get('/user/exam/getSomeSubjects' , data);

// 添加试题类型
export const addSubjectType = (data) => fetch.post('/user/exam/addSubjectType' , data);

// 修改试题
export const updateSubject = (data) => fetch.put('/user/exam/updateSubject' , data);
