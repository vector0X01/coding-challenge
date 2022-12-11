import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import Loader from '../components/Loader';

test('shows loading when true', () => {
  render(<Loader loading={true} />);

  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();
})
