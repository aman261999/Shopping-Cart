import { describe, test, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { configureStore } from "redux-mock-store";
import SingleProduct from "./SingleProduct";
import '@testing-library/jest-dom';

// Mock the Navbar and useNavigate
vi.mock('../Navbar/Navbar', () => ({
  default: () => <div>Mocked Navbar</div>
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock the material-ripple-effects module
vi.mock('material-ripple-effects', () => ({
  default: vi.fn().mockImplementation(() => ({
    create: vi.fn(),
    remove: vi.fn(),
  })),
}));

const mockStore = configureStore([]);

describe("SingleProduct Component", () => {
    let store;
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);

        store = mockStore({
            products: {
                singleProduct: {
                    id: "1",
                    name: "Test Product",
                    price: 100,
                    img: "test.jpg",
                    text: "Test Description",
                    color: ["red", "blue"],
                },
            },
            cart: {
                cartItems: [],
                totalQuantity: 0,
                totalWishListQuantity: 0,
                totalPrice: 0,
            },
            user: {
                currentUser: {
                    name: "Test User",
                    email: "test@example.com",
                    authUser: true
                },
                wishlist: []
            },
        });

        // Clear all mocks and reset fetch mock
        vi.clearAllMocks();
        globalThis.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    id: "1",
                    name: "Test Product",
                    price: 100,
                    img: "test.jpg",
                    text: "Test Description",
                    color: ["red", "blue"],
                }),
            })
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/product/1']}>
                    <SingleProduct />
                </MemoryRouter>
            </Provider>
        );
    };

    test("renders product name", async () => {
        renderComponent();
        expect(await screen.findByText("Test Product")).toBeInTheDocument();
    });

    test("renders 10% OFF text", async () => {
        renderComponent();
        expect(await screen.findByText("10% OFF")).toBeInTheDocument();
    });

    test("renders product price", async () => {
        renderComponent();
        expect(await screen.findByText(/\$100/)).toBeInTheDocument();
    });

    test("renders Add to Cart button", async () => {
        renderComponent();
        expect(await screen.findByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
    });

    test("dispatches addToCart action when button clicked", async () => {
        renderComponent();
        const button = await screen.findByRole('button', { name: /Add to Cart/i });
        await userEvent.click(button);
        
        const actions = store.getActions();
        expect(actions).toContainEqual(
            expect.objectContaining({
                type: 'cart/addToCart',
                payload: expect.objectContaining({
                    id: "1",
                    name: "Test Product",
                    price: 100,
                })
            })
        );
    });

    test("displays product description", async () => {
        renderComponent();
        expect(await screen.findByText("Test Description")).toBeInTheDocument();
    });
});