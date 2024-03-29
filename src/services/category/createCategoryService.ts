import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { TCategory, TCategoryResponse } from "../../interfaces/categoryInterface"
import {  requestCategorieSchema } from "../../schemas/categorieSchema"

export  const createCategoryService= async(data:TCategory)
:Promise<TCategoryResponse>=>{

const categoryRepository:Repository<Category>=AppDataSource.getRepository(Category)

const category:Category=categoryRepository.create(data)

await categoryRepository.save(category)

const newCategory: TCategoryResponse = requestCategorieSchema.parse(category)
    
return  newCategory
}