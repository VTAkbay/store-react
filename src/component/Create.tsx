import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();

  const [inputs, setInputs] = React.useState({} as any);
  const [categories, setCategories] = React.useState([]);

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
      avatar: !inputs.avatar ? "https://picsum.photos/200/300" : inputs.avatar,
      developerEmail: "vta@vahidturabakbay.com",
    }),
  };

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

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    fetch(
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products",
      requestOptions
    ).then((response) => {
      if (response.status === 201) {
        navigate("/", { replace: true });
      }
    });
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="text-center justify-center mt-6">
      <div className="w-full max-w-xs m-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <p className="block text-gray-700 text-base font-bold mb-4">
            Create Product
          </p>
          <div className="mb-4">
            <input
              value={inputs.name || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
            />
          </div>

          <div className="mb-4">
            <input
              value={inputs.description || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              type="text"
              placeholder="Description"
            />
          </div>

          <div className="mb-4">
            <input
              name="avatar"
              value={inputs.avatar || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="avatar"
              type="avatar"
              placeholder="Image URL"
            />
          </div>

          <div className="mb-4">
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={inputs.category || ""}
              name="category"
              onChange={handleChange}
              id="category"
            >
              <option key={0} value={""}>
                Select Category
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

          <div className="mb-4">
            <input
              name="price"
              value={inputs.price || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Price"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Vahid Turab Akbay "vta@vahidturabakbay.com"
        </p>
      </div>
    </div>
  );
}
