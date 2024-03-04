import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreatePropertyLandingPage from "./CreatePropertyLandingPage";

describe("CreatePropertyLandingPage", () => {
  it("renders CreateProperty component", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreatePropertyLandingPage />
      </MemoryRouter>
    );
    const createPropertyComponent = getByTestId("create-property-component");
    expect(createPropertyComponent).toBeTruthy();
  });
});
