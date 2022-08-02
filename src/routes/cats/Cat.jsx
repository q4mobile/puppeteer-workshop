import { useParams } from "react-router-dom";
import { get } from "../../../db_api.js";

export default function Invoice() {
  let params = useParams();
  let cat = get('cats', parseInt(params.catId, 10));

  return (
    <main className="cat_item" style={{ padding: "1rem" }}>
      <h2 className="cat_item-name">{cat.name}</h2>
      <p className="cat_item-job"> <b>Role:</b> {cat.job}</p>
      <img
        class="cat_item-picture"
        src={cat.picture}
        alt={"An innacurate picture of " + cat.name}
      />
    </main>
  );
}
