import React from 'react';
import { screen, render } from '@testing-library/react';
import Hero from './Hero';

describe('renders Hero.tsx', () => {

    test('Hero div is rendered', () => {
        render(<Hero />);
        const hero = screen.getByTestId('hero');
        expect(hero).not.toBeNull();
    });
});