// isAuthenticated.test.ts

import { isAuthenticated } from './AuthUtil'; // Replace with the actual path
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";

// Mock localStorage
const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
    };
  })();
  
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  
  describe('isAuthenticated', () => {
    beforeEach(() => {
      // Clear localStorage mock and all mocks before each test
      mockLocalStorage.clear();
      jest.clearAllMocks();
    });
  
    it('returns true when user is authenticated', () => {
      // Simulate a user being authenticated with a token stored in localStorage
      mockLocalStorage.getItem.mockImplementation((key: string) => {
        if (key === 'userData') {
          return JSON.stringify({ accessToken: 'valid-token' });
        }
        return null;
      });
  
      expect(isAuthenticated()).toBe(true);
    });
  
    it('returns false when userData is not stored in localStorage', () => {
      // Simulate localStorage not containing userData
      mockLocalStorage.getItem.mockImplementation((key: string) => null);
  
      expect(isAuthenticated()).toBe(false);
    });
  
    it('returns false when userData does not contain a token', () => {
      // Simulate userData in localStorage without a token
      mockLocalStorage.getItem.mockImplementation((key: string) => JSON.stringify({}));
  
      expect(isAuthenticated()).toBe(false);
    });
  });