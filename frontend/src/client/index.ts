import * as productService from "./productService";
import * as userService from "./userService";

const services = {
  ...productService,
  ...userService,
};

export default services;
