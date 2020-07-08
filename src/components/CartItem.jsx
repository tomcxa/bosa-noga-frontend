import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";

const CartItem = ({ item, index }) => {
  const { removeFromCart } = useContext(GlobalContext);

  const removeHandler = () => removeFromCart(item.id + item.size);

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        <Link to={`/product/${item.id}`}>{item.title}</Link>
      </td>
      <td>{item.size}</td>
      <td>{item.count}</td>
      <td>{item.price}</td>
      <td>{item.count * item.price}</td>
      <td>
        <button
          onClick={removeHandler}
          className="btn btn-outline-danger btn-sm"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
