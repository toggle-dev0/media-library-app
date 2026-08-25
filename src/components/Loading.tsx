export const Loading = ({ error }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
      }}
    >
      {" "}
      {error ? (
        <span style={{ display: "block" }}>Error: {error}</span>
      ) : (
        <span style={{ display: "block" }}>Loading...</span>
      )}
    </div>
  );
};

interface Props {
  error: string;
}
