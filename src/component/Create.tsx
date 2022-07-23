import * as React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Create.css";

export default function Create() {
  const navigate = useNavigate();

  const [inputs, setInputs] = React.useState({} as any);
  const [categories, setCategories] = React.useState([]);

  React.useLayoutEffect(() => {
    async function fetchCategories() {
      const categories = await (
        await fetch(
          "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/",
          {
            method: "GET",
          }
        )
      ).json();

      setCategories(categories);
    }

    fetchCategories();
  }, []);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputs.name,
        price: inputs.price,
        category: inputs.category,
        description: inputs.description,
        avatar: "https://picsum.photos/200/300",
        developerEmail: "vta@vahidturabakbay.com",
      }),
    };

    fetch(
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products",
      requestOptions
    ).then((response) => {

      if (response.status === 201) {
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <div className="create">
      <div className="title">
        <h2>Create Product</h2>
      </div>
      <div className="forms">
        <form onSubmit={handleSubmit}>
          <label>
            Product name:
            <input
              type="text"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={inputs.description || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="avatar"
              value={inputs.avatar || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Categories:
            <select
              value={inputs.category || ""}
              name="category"
              onChange={handleChange}
            >
              <option key={0} value={""}>
                Select
              </option>
              {categories.map((m: any) => {
                return (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={inputs.price || ""}
              onChange={handleChange}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
