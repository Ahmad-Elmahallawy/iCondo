// List.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import List from "./List";
import CondoComponent from "../Condo/Condo";
import PropertyComponent from "../Property/Property";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

const condos = [
  {
    size: "100",
    condoFee: "890",
    unitNumber: "22",
    imageUrl: "Assets/public",
    condoId: 1
  },
  {
    size: "100",
    condoFee: "890",
    unitNumber: "22",
    imageUrl: "Assets/public",
    condoId: 1
  },
  {
    size: "100",
    condoFee: "890",
    unitNumber: "22",
    imageUrl: "Assets/public",
    condoId: 1
  },
  {
    size: "100",
    condoFee: "890",
    unitNumber: "22",
    imageUrl: "Assets/public",
    condoId: 1
  },
  {
    size: "100",
    condoFee: "890",
    unitNumber: "22",
    imageUrl: "Assets/public",
    condoId: 1
  },
  {
    size: "100",
    condoFee: "890",
    unitNumber: "22",
    imageUrl: "Assets/public",
    condoId: 1
  },
  {
    size: "100",
    condoFee: "890",
    unitNumber: "22",
    imageUrl: "Assets/public",
    condoId: 1
  },
];

const properties = [
  {
    id: 1,
    name: "Windcreek Villa",
    address: "123 Main Street, Cityville",
    unitCount: "50",
    parkingSpotCount: "100",
    lockerCount: "25",
    imageUrl: "/property1.png",
  },
  {
    id: 2,
    name: "Big Townhouse",
    address: "456 Elm Street, Townsville",
    unitCount: "30",
    parkingSpotCount: "60",
    lockerCount: "15",
    imageUrl: "Assets/property2.png",
  },
  {
    id: 3,
    name: "Another Condominium",
    address: "222 One Street, Mainsville",
    unitCount: "40",
    parkingSpotCount: "80",
    lockerCount: "20",
    imageUrl: "Assets/property3.png",
  },
  {
    id: 4,
    name: "Someone's Complex",
    address: "555 Some Avenue, Hisville",
    unitCount: "20",
    parkingSpotCount: "40",
    lockerCount: "10",
    imageUrl: "Assets/property4.png",
  },
  {
    id: 5,
    name: "One More Property",
    address: "888 A Boulevard, Hersville",
    unitCount: "35",
    parkingSpotCount: "70",
    lockerCount: "18",
    imageUrl: "Assets/property5.png",
  },
];

describe("List", () => {
  // Condos
  it("renders a list of CondoComponents", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const condoComponents = screen.getAllByTestId("condo-component");
    if (condos.length > 4) {
      expect(condoComponents.length).toBe(4);
    } else {
      expect(condoComponents.length).toBe(condos.length);
    }
  });

  it("disables the previous button initially", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).toBeDisabled();
  });

  it("enables the next button initially", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeEnabled();
  });

  it("does not update the displayed condos when previous button is clicked at start", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const condoComponentsBefore = screen.getAllByTestId("condo-component");
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
    const condoComponentsAfter = screen.getAllByTestId("condo-component");
    expect(condoComponentsBefore).toHaveLength(condoComponentsAfter.length);
  });

  it("updates the displayed condos when next button is clicked", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const condoComponents = screen.getAllByTestId("condo-component");
    expect(condoComponents).toHaveLength(3);
  });

  it("disables the next button when condos at the end of condos list is displayed", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const updatedNextButton = screen.getByTestId("next-button");
    expect(updatedNextButton).toBeDisabled();
  });

  it("enables the previous button when next button is clicked after being disabled", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).toBeEnabled();
  });

  it("disables the previous button after clicking next button and then previous button", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    const updatedPrevButton = screen.getByTestId("prev-button");
    expect(updatedPrevButton).toBeDisabled();
  });

  it("enables the previous button after clicking next button", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const prevButton = screen.getByTestId("prev-button");
    // fireEvent.click(prevButton);
    expect(prevButton).toBeEnabled();
  });

  it("does not update the displayed condos when next button is clicked at end", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    // fireEvent.click(nextButton);
    const condoComponentsBefore = screen.getAllByTestId("condo-component");
    fireEvent.click(nextButton);
    const condoComponentsAfter = screen.getAllByTestId("condo-component");
    expect(condoComponentsBefore).toHaveLength(condoComponentsAfter.length);
  });

  // Properties
  it("renders a list of PropertyComponents", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const propertyComponents = screen.getAllByTestId("property-component");
    if (properties.length > 4) {
      expect(propertyComponents.length).toBe(4);
    } else {
      expect(propertyComponents.length).toBe(properties.length);
    }
  });

  it("disables the previous button initially", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).toBeDisabled();
  });

  it("enables the next button initially", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeEnabled();
  });

  it("does not update the displayed properties when previous button is clicked at start", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const propertyComponentsBefore =
      screen.getAllByTestId("property-component");
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
    const propertyComponentsAfter = screen.getAllByTestId("property-component");
    expect(propertyComponentsBefore).toHaveLength(
      propertyComponentsAfter.length
    );
  });

  it("updates the displayed properties when next button is clicked", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const propertyComponents = screen.getAllByTestId("property-component");
    expect(propertyComponents).toHaveLength(1);
  });

  it("disables the next button when properties at the end of properties list is displayed", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const updatedNextButton = screen.getByTestId("next-button");
    expect(updatedNextButton).toBeDisabled();
  });

  it("enables the previous button when next button is clicked after being disabled", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).toBeEnabled();
  });

  it("disables the previous button after clicking next button and then previous button", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    const updatedPrevButton = screen.getByTestId("prev-button");
    expect(updatedPrevButton).toBeDisabled();
  });

  it("enables the previous button after clicking next button", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const prevButton = screen.getByTestId("prev-button");
    // fireEvent.click(prevButton);
    expect(prevButton).toBeEnabled();
  });

  it("does not update the displayed properties when next button is clicked at end", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent
              property={property}
              onClick={function (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    // fireEvent.click(nextButton);
    const propertyComponentsBefore =
      screen.getAllByTestId("property-component");
    fireEvent.click(nextButton);
    const propertyComponentsAfter = screen.getAllByTestId("property-component");
    expect(propertyComponentsBefore).toHaveLength(
      propertyComponentsAfter.length
    );
  });
});
