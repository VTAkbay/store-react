import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  async function getProductsAndCategories() {
    const resProducts = await fetch(
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/",
      {
        method: "GET",
      }
    );
    resProducts.json().then((result: any) => setProducts(result));
    if (resProducts.status === 200) {
      setLoading(false);
    }

    const resCategories = await fetch(
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/",
      {
        method: "GET",
      }
    );
    resCategories.json().then((result: any) => setCategories(result));
    if (resCategories.status === 200) {
      setLoading(false);
    }

    setCategories(categories);
  }

  function handleCategoryChange(event: any) {
    setSelectedCategory(event.target.value);
  }

  async function deleteProduct(id: any) {
    const res = await fetch(
      `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.status === 200) {
      getProductsAndCategories();
    }
  }

  React.useEffect(() => {
    getProductsAndCategories();
  }, []);

  return (
    <>
      {loading && <div>Loading</div>}

      {loading || (
        <div className="m-auto w-9/12 relative">
          <div className="mb-20">
            <input
              className=" mt-8 ml-4 shadow appearance-none border rounded w-4/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="search"
              name="search"
              placeholder="Apple Watch, Samsung S21, Macbook Pro..."
            />
            <select
              className="right-0 absolute mt-8 mr-4 h-10 shadow appearance-none border rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="categories"
              name="categories"
              onChange={handleCategoryChange}
            >
              <option value={"All"}>All</option>
              {categories.map((m: any) => {
                return (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="m-auto mt-24 justify-center items-center flex flex-row flex-wrap mb-24 w-10/12">
            {products?.map(({ avatar, category, id, name, price }: any) => {
              if (selectedCategory === "All" || category === selectedCategory) {
                return (
                  <div key={id}>
                    <button
                      onClick={() => {
                        deleteProduct(id);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={`detail/${id}`}
                      className="w-32 h-56 mr-8 ml-8 mb-14 flex justify-center text-center"
                    >
                      <div>
                        <div className="w-40 h-40 mb-4 m-auto rounded-lg border-8 border-solid border-white bg-white justify-center content-center flex p-0">
                          <img
                            className="max-h-full max-w-full m-auto bg-white"
                            src={avatar}
                            alt="avatar"
                          />
                        </div>

                        <div>
                          <p className="m-auto">{name}</p>
                          <p>$ {price}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}
