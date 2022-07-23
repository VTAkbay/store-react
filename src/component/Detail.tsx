import * as React from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();

  const [item, setItem] = React.useState({} as any);
  const [loading, setLoading] = React.useState(true);

  async function getProduct(id: string) {
    const product = await fetch(
      `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`,
      {
        method: "GET",
      }
    );
    product.json().then((result: any) => setItem(result));
    if (product.status === 200) {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getProduct(id as string);
  }, [id]);

  return (
    <>
      {loading && <div>Loading</div>}

      {loading || (
        <div className="relative justify-center w-6/12 m-auto mt-12">
          <div className="flex flex-row">
            <div className="m-0 w-40 h-40 rounded-xl flex justify-center content-center border-solid bg-white">
              <img
                src={item.avatar}
                className="bg-white max-h-36 m-auto"
                alt="avatar"
              />
            </div>
            <div className=" ml-10">
              <h1 className="text-2xl font-bold">{item.name}</h1>
              <p>$ {item.price}</p>
            </div>
          </div>
          <div className=" border-solid border-gray-500 border my-6 m-auto w-11/12 justify-center"></div>
          <div>
            <p className=" text-lg font-medium mb-3">Description</p>
            <p className=" text-gray-700">{item.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
