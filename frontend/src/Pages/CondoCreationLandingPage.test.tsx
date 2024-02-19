import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CondoCreationLandingPage from "./CondoCreationLandingPage";

describe("CondoCreationLandingPage component", () => {
  it("renders without crashing", () => {
    render(<CondoCreationLandingPage />);
  });

  it("renders CondoCreation component", () => {
    const { getByText } = render(<CondoCreationLandingPage />);
    expect(getByText("Create Condo Unit")).toBeInTheDocument();
  });
});
