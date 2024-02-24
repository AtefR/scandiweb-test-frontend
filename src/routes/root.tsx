import {
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";

export default function Root() {

  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <div className="app">
        <div className="header">
          <h1>Products List</h1>
          <div className="buttons">
            {pathname == '/' ? (
              <>
                <Link to={'add-product'} id="add-product-btn">ADD</Link>
                <button form='delete_form' id="delete-product-btn" type="submit">MASS DELETE</button>
              </>
            ) : ''}

            {pathname == '/add-product' ? (
              <>
                <button form='product_form' id="create-product-btn" type="submit">Save</button>
                <Link to={'/'} id="cancel-product-btn">Cancel</Link>
              </>
            ) : ''}
          </div>
        </div>

        <Outlet />
      </div>
      
      <div className="footer">
        Scandiweb Test assignment
      </div>
    </>
  );
}
