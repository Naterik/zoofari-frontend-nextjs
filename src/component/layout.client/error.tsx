export default function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <a
        href="/"
        style={{
          textDecoration: "none",
          color: "#2EB872",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Go back to Home
      </a>
    </div>
  );
}
