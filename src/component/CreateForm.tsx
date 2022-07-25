import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { baseApiUrl, defaultAvatarUrl, developerEmail } from "../lib/constants";
import { useNavigate } from "react-router-dom";

type UserSubmitForm = {
  name: string;
  description: string;
  avatar: string;
  category: string;
  price: number;
};

const CreateForm: React.FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState([]);

  async function fetchCategories() {
    const categories = await (
      await fetch(`${baseApiUrl}/case-study/categories/`, {
        method: "GET",
      })
    ).json();

    setCategories(categories);
  }

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(6, "Name must be at least 6 characters")
      .max(40, "Name must not exceed 40 characters"),
    description: Yup.string().required("Description is required"),
    avatar: Yup.string()
      .url("Must be a valid URL")
      .required("Image URL is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .typeError("Amount must be a number")
      .required("Price is required")
      .min(0, "Too low")
      .max(99999, "Too high"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        avatar: !data.avatar ? defaultAvatarUrl : data.avatar,
        developerEmail: developerEmail,
      }),
    };

    fetch(`${baseApiUrl}/case-study/products`, requestOptions).then(
      (response) => {
        if (response.status === 201) {
          navigate("/", { replace: true });
        }
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <p className=" text-center block text-gray-700 text-base font-bold mb-4">
        Create Product
      </p>

      <div className="mb-4">
        <label>Name</label>
        <input
          type="text"
          {...register("name")}
          className={`${
            errors.name?.message ? "border-red-600" : ""
          } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight`}
          id="name"
          placeholder="Name"
        />
        <div className=" text-red-500 text-xs mt-1 text-left">
          {errors.name?.message}
        </div>
      </div>

      <div className="mb-4">
        <label>Description</label>
        <input
          type="text"
          {...register("description")}
          className={`${
            errors.description?.message ? "border-red-600" : ""
          } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight`}
          id="description"
          placeholder="Description"
        />
        <div className=" text-red-500 text-xs mt-1 text-left">
          {errors.description?.message}
        </div>
      </div>

      <div className="mb-4">
        <label>Image URL</label>
        <input
          type="text"
          {...register("avatar")}
          className={`${
            errors.avatar?.message ? "border-red-600" : ""
          } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight`}
          id="avatar"
          placeholder="Image URL"
        />
        <div className=" text-red-500 text-xs mt-1 text-left">
          {errors.avatar?.message}
        </div>
      </div>

      <div className="mb-4">
        <label>Category</label>
        <select
          className={`${
            errors.category?.message ? "border-red-600" : ""
          } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight`}
          id="category"
          {...register("category")}
        >
          <option value="" disabled>
            Select category*
          </option>
          {categories.map((m: any) => {
            return (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            );
          })}
        </select>
        <div className=" text-red-500 text-xs mt-1 text-left">
          {errors.category?.message}
        </div>
      </div>

      <div className="mb-4">
        <label>Price</label>
        <input
          type="number"
          {...register("price")}
          className={`${
            errors.price?.message ? "border-red-600" : ""
          } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight`}
          id="price"
          defaultValue={0}
        />
        <div className=" text-red-500 text-xs mt-1 text-left">
          {errors.price?.message}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          id="submit-product-button"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
