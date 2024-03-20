import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

describe("full app navigation", () => {
  const setup = () => render(<App />, { wrapper: BrowserRouter });

  it("Rendering default hero page", () => {
    setup();

    // verify page content for default route
    expect(screen.getByTestId("hero")).not.toBeNull();
  });

  it("Rendering log in route", async () => {
    setup();

    // verify page content for expected route after navigating
    const logInBtn = screen.getByText(/log in/i);
    fireEvent.click(logInBtn);
    expect(screen.getByTestId("login-container")).not.toBeNull();
  });

  it("Rendering Register route", async () => {
    setup();

    // verify page content for expected route after navigating
    const RegisterBtn = screen.getByText(/Register/i);
    fireEvent.click(RegisterBtn);
    expect(screen.getByTestId("registration-container")).not.toBeNull();
  });

  it("Rendering my profile when user is not logged in", async () => {
    setup();

    // My profile will redirect user to log in page if not logged in
    const profileBtn = screen.getByText(/My Profile/i);
    fireEvent.click(profileBtn);
    expect(screen.getByTestId("login-container")).not.toBeNull();
  });
});

function NotFoundPage() {
  return <div>404 Page Not Found</div>;
}

function TestApp() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
