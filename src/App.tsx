import React from "react";
import { Link } from "react-router-dom";
import "./styles/App.css";

function App() {
  const [products, setProducts] = React.useState([]);

  const [categories, setCategories] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

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

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  React.useLayoutEffect(() => {
    getProductsAndCategories();
  }, []);

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

  return !loading ? (
    <>
      <div className="App">
        <div className="search-div">
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
          />

          <select
            id="categories"
            name="categories"
            onChange={handleCategoryChange}
          >
            <option key={5} value={"All"}>
              All
            </option>
            {categories.map((m: any) => {
              return (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="list">
          {products?.map(
            ({
              avatar,
              category,
              createdAt,
              description,
              developerEmail,
              id,
              name,
              price,
            }: any) => {
              if (selectedCategory === "All") {
                return (
                  <div key={id}>
                    <button
                      onClick={() => {
                        deleteProduct(id);
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`detail/${id}`} className="item">
                      <div>
                        <div className="avatar-div">
                          <img src={avatar} alt="avatar" width={150} />
                        </div>

                        <div>
                          <p>{name}</p>
                          <p>$ {price}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              } else {
                if (selectedCategory === category) {
                  return (
                    <div key={id}>
                      <button
                        onClick={() => {
                          deleteProduct(id);
                        }}
                      >
                        Delete
                      </button>
                      <Link to={`detail/${id}`} className="item" key={id}>
                        <div>
                          <div className="avatar-div">
                            <img src={avatar} alt="avatar" width={150} />
                          </div>

                          <div>
                            <p>{name}</p>
                            <p>$ {price}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              }
            }
          )}
        </div>
      </div>
    </>
  ) : (
    <div>Loading</div>
  );
}

export default App;
