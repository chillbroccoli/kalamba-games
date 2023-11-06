import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container page p-y-3">
      <h2 className="text-danger text-xs-center m-b-1">404</h2>
      <h1 className="text-primary text-xs-center">Not found</h1>
      <div style={{ display: "flex" }} className="flex-items-xs-middle flex-items-xs-center">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}
