// List.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import List from "./List";
import CondoComponent from "../Condo/Condo";
import PropertyComponent from "../Property/Property";
import "@testing-library/jest-dom";

const condos = [
  {
    condoId: 1,
    size: "1000 sqft",
    occupantName: "John Doe",
    bathrooms: "2",
    bedrooms: "3",
    condoType: "Duplex",
    lastRenovated: "2020-05-15",
    condoFee: "500",
    imageUrl: "Assets/condo1.png"
  },
  {
    condoId: 2,
    size: "850 sqft",
    occupantName: "Jane Smith",
    bathrooms: "1.5",
    bedrooms: "2",
    condoType: "Apartment",
    lastRenovated: "2019-10-20",
    condoFee: "400",
    imageUrl: "Assets/condo2.png"
  },
  {
    condoId: 3,
    size: "1200 sqft",
    occupantName: "Michael Johnson",
    bathrooms: "2.5",
    bedrooms: "4",
    condoType: "Townhouse",
    lastRenovated: "2021-02-28",
    condoFee: "600",
    imageUrl: "Assets/condo3.png"
  },
  {
    condoId: 4,
    size: "950 sqft",
    occupantName: "Emily Williams",
    bathrooms: "2",
    bedrooms: "3",
    condoType: "Studio",
    lastRenovated: "2020-11-10",
    condoFee: "450",
    imageUrl: "Assets/condo1.png"
  },
  {
    condoId: 5,
    size: "1100 sqft",
    occupantName: "Christopher Brown",
    bathrooms: "2",
    bedrooms: "3",
    condoType: "Penthouse",
    lastRenovated: "2018-08-12",
    condoFee: "700",
    imageUrl: "Assets/condo2.png"
  },
  {
    condoId: 6,
    size: "800 sqft",
    occupantName: "Amanda Davis",
    bathrooms: "1",
    bedrooms: "2",
    condoType: "Loft",
    lastRenovated: "2019-04-25",
    condoFee: "350",
    imageUrl: "Assets/condo3.png"
  },
  {
    condoId: 7,
    size: "950 sqft",
    occupantName: "Matthew Wilson",
    bathrooms: "1.5",
    bedrooms: "2",
    condoType: "Apartment",
    lastRenovated: "2021-08-05",
    condoFee: "480",
    imageUrl: "Assets/condo1.png"
  }
];

const properties = [
  {
    id: 1,
    title: "Windcreek Villa",
    address: "123 Main Street, Cityville",
    unitCount: "50",
    parkingSpotCount: "100",
    lockerCount: "25",
    imageUrl: "Assets/property1.png"
  },
  {
    id: 2,
    title: "Big Townhouse",
    address: "456 Elm Street, Townsville",
    unitCount: "30",
    parkingSpotCount: "60",
    lockerCount: "15",
    imageUrl: "Assets/property2.png"
  },
  {
    id: 3,
    title: "Another Condominium",
    address: "222 One Street, Mainsville",
    unitCount: "40",
    parkingSpotCount: "80",
    lockerCount: "20",
    imageUrl: "Assets/property3.png"
  },
  {
    id: 4,
    title: "Someone's Complex",
    address: "555 Some Avenue, Hisville",
    unitCount: "20",
    parkingSpotCount: "40",
    lockerCount: "10",
    imageUrl: "Assets/property4.png"
  },
  {
    id: 5,
    title: "One More Property",
    address: "888 A Boulevard, Hersville",
    unitCount: "35",
    parkingSpotCount: "70",
    lockerCount: "18",
    imageUrl: "Assets/property5.png"
  }
];

describe("List", () => {
    // Condos
    it("renders a list of CondoComponents", () => {
      render(
        <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
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
            <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
          );
        const prevButton = screen.getByTestId("prev-button");
        expect(prevButton).toBeDisabled();
      });
    
      it("enables the next button initially", () => {
        render(
            <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        expect(nextButton).toBeEnabled();
      });

      it("does not update the displayed condos when previous button is clicked at start", () => {
        render(
            <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
          );
        const condoComponentsBefore =
          screen.getAllByTestId("condo-component");
        const prevButton = screen.getByTestId("prev-button");
        fireEvent.click(prevButton);
        const condoComponentsAfter = screen.getAllByTestId("condo-component");
        expect(condoComponentsBefore).toHaveLength(
          condoComponentsAfter.length
        );
      });
    
      it("updates the displayed condos when next button is clicked", () => {
        render(
            <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        fireEvent.click(nextButton);
        const condoComponents = screen.getAllByTestId("condo-component");
        expect(condoComponents).toHaveLength(3);
      });
    
      it("disables the next button when condos at the end of condos list is displayed", () => {
        render(
            <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        fireEvent.click(nextButton);
        const updatedNextButton = screen.getByTestId("next-button");
        expect(updatedNextButton).toBeDisabled();
      });
    
      it("enables the previous button when next button is clicked after being disabled", () => {
        render(
            <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        fireEvent.click(nextButton);
        const prevButton = screen.getByTestId("prev-button");
        expect(prevButton).toBeEnabled();
      });
    
      it("disables the previous button after clicking next button and then previous button", () => {
        render(
            <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
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
            <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        fireEvent.click(nextButton);
        const prevButton = screen.getByTestId("prev-button");
        // fireEvent.click(prevButton);
        expect(prevButton).toBeEnabled();
      });
    
      it("does not update the displayed condos when next button is clicked at end", () => {
        render(
            <List items={condos} renderItem={(condo) => <CondoComponent condo={condo} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        fireEvent.click(nextButton);
        // fireEvent.click(nextButton);
        const condoComponentsBefore =
          screen.getAllByTestId("condo-component");
        fireEvent.click(nextButton);
        const condoComponentsAfter = screen.getAllByTestId("condo-component");
        expect(condoComponentsBefore).toHaveLength(
          condoComponentsAfter.length
        );
      });
    
    // Properties
    it("renders a list of PropertyComponents", () => {
      render(
        <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
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
            <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
          );
        const prevButton = screen.getByTestId("prev-button");
        expect(prevButton).toBeDisabled();
      });
    
      it("enables the next button initially", () => {
        render(
            <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        expect(nextButton).toBeEnabled();
      });

      it("does not update the displayed properties when previous button is clicked at start", () => {
        render(
            <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
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
            <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        fireEvent.click(nextButton);
        const propertyComponents = screen.getAllByTestId("property-component");
        expect(propertyComponents).toHaveLength(1);
      });
    
      it("disables the next button when properties at the end of properties list is displayed", () => {
        render(
            <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        fireEvent.click(nextButton);
        const updatedNextButton = screen.getByTestId("next-button");
        expect(updatedNextButton).toBeDisabled();
      });
    
      it("enables the previous button when next button is clicked after being disabled", () => {
        render(
            <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        fireEvent.click(nextButton);
        const prevButton = screen.getByTestId("prev-button");
        expect(prevButton).toBeEnabled();
      });
    
      it("disables the previous button after clicking next button and then previous button", () => {
        render(
            <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
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
            <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
          );
        const nextButton = screen.getByTestId("next-button");
        fireEvent.click(nextButton);
        const prevButton = screen.getByTestId("prev-button");
        // fireEvent.click(prevButton);
        expect(prevButton).toBeEnabled();
      });
    
      it("does not update the displayed properties when next button is clicked at end", () => {
        render(
            <List items={properties} renderItem={(property) => <PropertyComponent property={property} />} />
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