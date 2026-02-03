import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Handle GitHub Pages redirect from 404.html
// The 404.html redirects all 404s to index.html with ?p=/original/path
const searchParams = new URLSearchParams(window.location.search);
const redirectPath = searchParams.get("p");

if (redirectPath) {
  // Replace the URL with the original path (remove the ?p= query param)
  const newPath =
    redirectPath.replace(/&/g, "&") +
    window.location.hash +
    window.location.search.replace(/[?&]p=[^&]*/, "").replace(/^&/, "?");
  window.history.replaceState(null, "", newPath);
}

createRoot(document.getElementById("root")!).render(<App />);
