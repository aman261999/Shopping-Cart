import { describe, it, expect } from "vitest";
import sliderReducer, { nextSlide, prevSlide, dotSlide } from "./sliderSlice";
import { sliderData } from "../../assets/data/dummyData";

describe("sliderSlice", () => {
  const initialState = {
    value: 0,
    length: sliderData.length,
  };

  it("should return the initial state", () => {
    expect(sliderReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle nextSlide with valid index", () => {
    const state = sliderReducer(initialState, nextSlide(1));
    expect(state.value).toBe(1);
  });

  it("should wrap around to 0 if nextSlide index exceeds length", () => {
    const state = sliderReducer(initialState, nextSlide(sliderData.length));
    expect(state.value).toBe(0);
  });

  it("should handle prevSlide with valid index", () => {
    const state = sliderReducer(initialState, prevSlide(2));
    expect(state.value).toBe(2);
  });

  it("should wrap around to last index if prevSlide goes below 0", () => {
    const state = sliderReducer(initialState, prevSlide(-1));
    expect(state.value).toBe(sliderData.length - 1);
  });

  it("should handle dotSlide by setting the value directly", () => {
    const state = sliderReducer(initialState, dotSlide(3));
    expect(state.value).toBe(3);
  });
});
