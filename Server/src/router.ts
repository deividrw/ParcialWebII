import { Router } from "express";
import {CreateAtividadeController} from "./controller/CreateProductController"
import { GetProductController } from "./controller/GetProductController";
import { DelProduct } from "./controller/DelProductController";



const router = Router();

const createProduct = new CreateAtividadeController();
const getProduct = new GetProductController();
const delProduct = new DelProduct()


router.post("/categoria",createProduct.handle)
router.get("/getcategoria",getProduct.handle)
router.delete("/delcategoria/:id",delProduct.handle)


export { router };