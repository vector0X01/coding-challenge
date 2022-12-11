import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Main from '../pages/Main';

describe('Submit tests', () => {
    test('on submit, check with large values', async () => {
    render(<Main />);
    const minLongitude = screen.getByTestId('input-left');
    const maxLongitude = screen.getByTestId('input-right');
    const maxLatitude = screen.getByTestId('input-top');
    const minLatitude = screen.getByTestId('input-bottom');
    const submitBtn = screen.getByTestId('submit-btn');

    fireEvent.change(minLongitude, { target: { value: 27.458267 } })
    fireEvent.change(maxLongitude, { target: { value: 27.516503 } })
    fireEvent.change(minLatitude, { target: { value: 53.492361 } })
    fireEvent.change(maxLatitude, { target: { value: 54.514950 } })

    userEvent.click(submitBtn);

    await waitFor(() => {
        expect(screen.getByTestId('error-msg')).toHaveTextContent('You requested too many nodes (limit is 50000). Either request a smaller area, or use planet.osm');
    })
    })

    test('on submit. check if max is lesser than min', async () => {
    render(<Main />);
    const minLongitude = screen.getByTestId('input-left');
    const maxLongitude = screen.getByTestId('input-right');
    const maxLatitude = screen.getByTestId('input-top');
    const minLatitude = screen.getByTestId('input-bottom');
    const submitBtn = screen.getByTestId('submit-btn');

    fireEvent.change(minLongitude, { target: { value: 27.458267 } })
    fireEvent.change(maxLongitude, { target: { value: 27.516503 } })
    fireEvent.change(minLatitude, { target: { value: 53.492361 } })
    fireEvent.change(maxLatitude, { target: { value: 52.514950 } })

    userEvent.click(submitBtn);

    await waitFor(() => {
        expect(screen.getByTestId('error-msg')).toHaveTextContent('The latitudes must be between -90 and 90, longitudes between -180 and 180 and the minima must be less than the maxima.');
    })
    }, 10000)

    test('on submit, success with correct values', async () => {
    render(<Main />);
    const minLongitude = screen.getByTestId('input-left');
    const maxLongitude = screen.getByTestId('input-right');
    const maxLatitude = screen.getByTestId('input-top');
    const minLatitude = screen.getByTestId('input-bottom');
    const submitBtn = screen.getByTestId('submit-btn');

    fireEvent.change(minLongitude, { target: { value: 27.458267 } })
    fireEvent.change(maxLongitude, { target: { value: 27.516503 } })
    fireEvent.change(minLatitude, { target: { value: 53.492361 } })
    fireEvent.change(maxLatitude, { target: { value: 53.514950 } })

    userEvent.click(submitBtn);

    await waitFor(() => {
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    })

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'), {timeout: 10000})

    await waitFor(() => {
        expect(screen.getByTestId('features')).toBeInTheDocument();
    })
    }, 10000)
})
