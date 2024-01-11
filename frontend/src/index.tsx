import React from "react";
import ReactDOM from "react-dom/client";
import { decodeJwt } from "jose";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initAppCenterSDK } from "@semcore/app-center-js-sdk";
import { JWT } from "./pages/JWT";
import { Notifications } from "./pages/Notifications";
import { Reports } from "./pages/Reports";
import { Methods } from "./pages/Methods";
import { NotFound } from "./pages/NotFound";

// JWT from url parameters. This app can not be run without Semrush iframe, so there are
// always jwt in url parameters.
const iframeJwtToken = new URLSearchParams(window.location.search).get("jwt")!;

// This code takes JWT token from URL parameters, when app is in Semrush iframe.
// Token's "url" field will be used to guide frontend to specific page.
// Without this code, frontend will always show its "/" page after refresh, even if
// path on Semrush App Center page is deeper - because if url is, e.g. "https://semrush.com/app/sample-app/deep_link/2",
// your app in iframe will only see "/?jwt=..." in path, and "deep_link/2" will be in "url" field of JWT token.
const setInitialUrl = (): void => {
  const url = decodeJwt(iframeJwtToken).url as string;
  window.history.replaceState({}, "", url);
};

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JWT jwt={iframeJwtToken} />} />
          <Route path="/methods" element={<Methods />} />
          <Route
            path="/notifications"
            element={<Notifications jwt={iframeJwtToken} />}
          />
          <Route path="/reports" element={<Reports jwt={iframeJwtToken} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

initAppCenterSDK(); // This function creates a global object SM, then we can use its methods
setInitialUrl();

// Rendering your application after SM initialization
window.SM.init().then(() => {
  ReactDOM.createRoot(document.getElementById("app-root")!).render(<App />);
});
