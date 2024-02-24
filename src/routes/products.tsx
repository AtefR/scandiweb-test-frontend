import {
  useLoaderData,
  redirect,
  Form
} from "react-router-dom";
import { getProducts, deleteProducts } from "../products.ts";
import type { ActionFunction } from "react-router";
import { LoaderFunction } from 'react-router-dom';

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<ReturnType<TLoaderFn>> extends Response | infer D
	? D
	: never;

export const loader = (async () => {
  const products = await getProducts();

  return { products };
}) satisfies LoaderFunction;


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const ids: Array<number> = []

  for (const pair of formData.entries()) {
    ids.push(Number(pair[1]))
  }

  await deleteProducts(ids);

  return redirect('/');
}

export default function Products() {
  const data = useLoaderData() as LoaderData<typeof loader>;

  const {products} = data

  return (
    <>
    <div>
      {products.length ? (
          <div className="products">
            <Form id='delete_form' method="post">
              {products.map((product) => (
                <div className="product" key={product.id}>
                  <div>
                    <input type="checkbox" value={product.id} name="ids" className="delete-checkbox" id="delete-checkbox" />
                  </div>
                  <span>{product.sku}</span>
                  <span>{product.name}</span>
                  <span>{product.price}</span>
                  <span>
                    {product.type == 'disc' ? `Size: ${product.attributes.size} MB` : ''}
                    {product.type == 'book' ? `Weight: ${product.attributes.weight} KG` : ''}
                    {product.type == 'furniture' ? `Dimensions: ${product.attributes.height}x${product.attributes.width}x${product.attributes.length}` : ''}
                  </span>
                </div>
              ))}
            </Form>
          </div>
        ) : (
          <p>
            <i>No products</i>
          </p>
        )}
      </div>
    </>
  );
}
