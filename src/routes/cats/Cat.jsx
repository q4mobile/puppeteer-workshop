import { useParams } from "react-router-dom";
import { get } from "../../../db_api";

export default function Cat() {
  const params = useParams();
  const catData = get("cats", parseInt(params.catId, 10));

  return (
    <main className="cat_item" style={{ padding: "1rem" }}>
      <h2 className="cat_item-name">{catData.name}</h2>
      <p className="cat_item-job">
        {" "}
        <b>Role:</b> <span className="cat_item-job_title">{catData.job}</span>
      </p>
      <img
        clasName="cat_item-picture"
        src={catData.picture}
        alt={`An innacurate depiction of ${catData.name}`}
      />
    </main>
  );
}
