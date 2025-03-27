import { describe, expect, beforeEach, vi, it } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import '@testing-library/jest-dom';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('App Component', () => {
  it('renders loading initially', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('fetches and displays products', async () => {
    // Mock the fetch call with a more robust implementation
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]),
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Initial loading state should be present
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for loading to disappear and products to appear
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-2')).toBeInTheDocument();
    }, 5000);
  });
});