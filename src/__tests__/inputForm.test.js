import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import InputForm from '../components/InputForm';

describe('Input form tests', () => {
    test('check if all 4 fields present', () => {
    render(<InputForm />);
    const inputLeft = screen.getByTestId('input-left');
    const inputRight = screen.getByTestId('input-right');
    const inputTop = screen.getByTestId('input-top');
    const inputBottom = screen.getByTestId('input-bottom');

    expect(inputLeft).toBeInTheDocument();
    expect(inputRight).toBeInTheDocument();
    expect(inputTop).toBeInTheDocument();
    expect(inputBottom).toBeInTheDocument();
    })

    test('input field doesn\'t allow text', async () => {
    render(<InputForm />);
    const inputLeft = screen.getByTestId('input-left');

    userEvent.clear(inputLeft);
    userEvent.type(inputLeft, 'abc');
    await waitFor(() => {
        expect(inputLeft.value).toBe('');
    })
    })

    test('input field allows positive and negative numbers', async () => {
    render(<InputForm />);
    const inputLeft = screen.getByTestId('input-left');

    fireEvent.change(inputLeft, { target: { value: 123.45 } })
    await waitFor(() => {
        expect(inputLeft.value).toBe('123.45');
    })

    fireEvent.change(inputLeft, { target: { value: -24.68 } })
    await waitFor(() => {
        expect(inputLeft.value).toBe('-24.68');
    })
    })

    test('latitude and longitude validation', async () => {
    render(<InputForm />);
    const longitude = screen.getByTestId('input-left'); // -180 to 180
    const latitude = screen.getByTestId('input-top'); // -90 to 90

    fireEvent.change(longitude, { target: { value: 200 } })
    await waitFor(() => {
        expect(longitude.classList.contains('input-error')).toBe(true);
    })

    fireEvent.change(longitude, { target: { value: 100 } })
    await waitFor(() => {
        expect(longitude.classList.contains('input-error')).toBe(false);
    })

    fireEvent.change(latitude, { target: { value: 100 } })
    await waitFor(() => {
        expect(latitude.classList.contains('input-error')).toBe(true);
    })

    fireEvent.change(latitude, { target: { value: -60 } })
    await waitFor(() => {
        expect(latitude.classList.contains('input-error')).toBe(false);
    })
    })
})
