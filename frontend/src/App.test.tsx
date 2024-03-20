import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

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

test("landing on a bad page", async () => {
  const badRoute = "/some/bad/route";

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  );

  // Adjust this line based on how your 404 page is actually rendered or identified
  const notFoundText = screen.queryByText(/404 Page Not Found/i);
  expect(notFoundText).toBeInTheDocument();
});
