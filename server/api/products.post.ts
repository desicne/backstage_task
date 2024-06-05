import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs'
import path from 'path'

const prisma = new PrismaClient()
const productsFilePath = path.join(process.cwd(), 'server', 'products.json')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    console.log('track - product creation')
    const newProduct = await prisma.product.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        image: 'https://placehold.co/600x400/png'
      }
    })

    const productsData = await fs.readFile(productsFilePath, 'utf8')
    const products = JSON.parse(productsData).products

    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1

    const newProductForFile = {
      id: newId,
      title: body.title,
      description: body.description,
      price: body.price,
      image: 'https://placehold.co/600x400/png'
    }
    products.push(newProductForFile)

    await fs.writeFile(productsFilePath, JSON.stringify({ products }, null, 2))

    console.log(newProduct)
    return newProduct
  } catch (error) {
    console.error('Error creating product:', error)
    return { error: 'Failed to create product' }
  }
});
