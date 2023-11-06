import { ThreeDots } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div
      style={{
        paddingTop: "25px",
        paddingBottom: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThreeDots width={50} height={50} radius={5} ariaLabel="three-dots-loading" color="#5cb85c" />
    </div>
  );
}
