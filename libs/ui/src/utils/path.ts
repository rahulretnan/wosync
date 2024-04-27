import validator from 'validator';

export const encryptParam = (param: string) =>
  validator.isBase64(param) ? param : btoa(param);

export const decryptParam = (param: string) =>
  validator.isBase64(param) ? atob(param) : param;
