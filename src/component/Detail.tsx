import * as React from "react";
import { useParams } from "react-router-dom";
import "../styles/Detail.css";

export default function Detail() {
  const { id } = useParams();
  const [item, setItem] = React.useState({} as any);
  const [loading, setLoading] = React.useState(true);

  async function getProduct() {
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

  React.useLayoutEffect(() => {
    getProduct();
  }, [id]);

  return !loading ? (
    <div className="detail">
      <div className="head">
        <div className="avatar-div">
          <img src={item.avatar} alt="avatar" width={150} />
        </div>
        <div className="item-details">
          <h1>{item.name}</h1>
          <p>$ {item.price}</p>
        </div>
      </div>
      <div className="border"></div>
      <div className="item-description">
        <h3>Description</h3>
        <p>{item.description}</p>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
