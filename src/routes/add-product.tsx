import {
  redirect,
  Form,
} from "react-router-dom";
import { useState } from "react";
import { Product, ProductAttribute, createProduct } from "../products.ts";
import type { ActionFunction } from "react-router";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  console.log(data)
  const attributes: ProductAttribute = {}

  if (data.type == 'disc') {
    attributes.size = Number(data.size);
  }
  
  if (data.type == 'book') {
    attributes.weight = Number(data.weight);
  }

  if (data.type == 'furniture') {
    attributes.height = Number(data.height);
    attributes.width = Number(data.width);
    attributes.length = Number(data.length);
  }

  const product: Product = {
    sku: data.sku.toString(),
    name: data.name.toString(),
    price: Number(data.price),
    type: data.type.toString(),
    attributes,
  }

  await createProduct(product)

  return redirect('/');
}

export default function AddProduct() {
  const [selectedType, setSelectedType] = useState('disc');

  return (
    <>
      <div>
        <Form name="product_form" id='product_form' method="post">
          <label htmlFor="sku">SKU:</label>
          <input type="text" id="sku" name="sku" />

          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="price">Price ($):</label>
          <input type="number" id="price" name="price" />

          <label htmlFor="cars">Choose a car:</label>


          <label htmlFor="type">Type:</label>
          <select name="type" id="productType" onChange={e => setSelectedType(e.target.value)}>
          <option value="disc" id="DVD">DVD</option>
          <option value="furniture" id="Furniture">Furniture</option>
          <option value="book" id="Book">Book</option>
          </select>

          {selectedType == 'disc' ? (
            <div id="DVD">
              <label htmlFor="size">Size (MB):</label>
              <input type="number" id="size" name="size" />

              <span id="description">
                Please provide size in Megabytes
              </span>
            </div>
          ) : ''}

          
          {selectedType == 'furniture' ? (
            <div id="Furniture">
              <label htmlFor="height">Height (CM):</label>
              <input type="number" id="height" name="height" />

              <label htmlFor="width">Width (CM):</label>
              <input type="number" id="width" name="width" />
              
              <label htmlFor="length">Length (CM):</label>
              <input type="number" id="length" name="length" />

              <span id="description">
                Please provide dimensions in HxWxL format
              </span>
            </div>
          ) : ''}

          
          {selectedType == 'book' ? (
            <div id="Book">
              <label htmlFor="weight">Weight (KG):</label>
              <input type="number" id="weight" name="weight" />

              
              <span id="description">
                Please provide weight in Kelograms
              </span>
            </div>
          ) : ''}
        </Form>
      </div>
    </>
  );
}
