import { describe, it, expect } from "vitest";
import productsReducer, { setProducts, filterProduct, singleProduct, setCache } from "./productsSlice";

describe("productsSlice", () => {
  const initialState = {
    products: [],
    filteredProducts: [],
    singleProduct: [],
    cache: {}
  };

  it("should return the initial state", () => {
    expect(productsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle setProducts", () => {
    const productsData = [
      { id: 1, name: "Laptop" },
      { id: 2, name: "Phone" },
    ];
    const state = productsReducer(initialState, setProducts(productsData));

    expect(state.products).toEqual(productsData);
  });

  it("should handle filterProduct", () => {
    const filteredData = [
      { id: 1, name: "Laptop" },
    ];
    const state = productsReducer(initialState, filterProduct(filteredData));

    expect(state.filteredProducts).toEqual(filteredData);
  });

  it("should handle singleProduct", () => {
    const singleProductData = { id: 3, name: "Headphones" };
    const state = productsReducer(initialState, singleProduct(singleProductData));

    expect(state.singleProduct).toEqual(singleProductData);
  });

  it("should handle setCache", () => {
    const cachePayload = { type: "electronics", data: [{ id: 1, name: "Laptop" }] };
    const state = productsReducer(initialState, setCache(cachePayload));

    expect(state.cache.electronics).toEqual(cachePayload.data);
  });

  it("should update existing cache keys correctly", () => {
    const firstCache = { type: "clothing", data: [{ id: 1, name: "T-shirt" }] };
    let state = productsReducer(initialState, setCache(firstCache));

    const secondCache = { type: "clothing", data: [{ id: 2, name: "Jacket" }] };
    state = productsReducer(state, setCache(secondCache));

    expect(state.cache.clothing).toEqual(secondCache.data);
  });
});
