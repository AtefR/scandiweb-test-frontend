export interface Product {
  id?: number;
  sku: string;
  name: string;
  price: number;
  type: string;
  attributes: ProductAttribute;
}

export interface ProductAttribute {
  size?: number,
  weight?: number,
  width?: number,
  height?: number,
  length?: number
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch('https://scandiweb-task-atefr.000webhostapp.com/api/products');
  const data = await response.json();

  return data.map((product: any) => {
    product.attributes = JSON.parse(product.attributes.replace(/\\/g,""))

    return product
  });
}

export async function deleteProducts(ids: Array<number>): Promise<boolean> {
  const response = await fetch('https://scandiweb-task-atefr.000webhostapp.com/api/products/delete', {
    method: 'POST',
    body: JSON.stringify({ids: ids})
  });

  return response.status == 200;
}


export async function createProduct(product: Product): Promise<boolean> {
  const response = await fetch('https://scandiweb-task-atefr.000webhostapp.com/api/products', {
    method: 'POST',
    body: JSON.stringify(product)
  });

  return response.status == 200;
}
