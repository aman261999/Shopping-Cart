import { describe, test, expect, beforeEach, vi, afterEach } from "vitest";
import authReducer, { login, googleLogin, logout } from "./authSlice";

describe("Auth Slice", () => {
  let sessionStorageMock;

  beforeEach(() => {
    sessionStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };

    Object.defineProperty(globalThis, "sessionStorage", {
      value: sessionStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should login with valid credentials", () => {
    const validUser = { name: "TestUser", password: "Test@1234" };
    const expectedUser = { 
      name: "TestUser", 
      email: "", 
      password: "Test@1234", 
      authUser: true 
    };
  
    const newState = authReducer(undefined, login(validUser));
  
    expect(newState.user).toEqual(expectedUser);
    expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
      "authUser",
      JSON.stringify(expectedUser)
    );
    expect(sessionStorageMock.setItem).toHaveBeenCalledWith("expiry", expect.any(Number));
  });

  test("should not login with invalid credentials", () => {
    const invalidUser = { name: "t", password: "123" };

    const newState = authReducer(undefined, login(invalidUser));

    expect(newState.user.authUser).toBe(false);
    expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
  });

  test("should login using Google login", () => {
    const googleUser = { name: "GoogleUser", email: "googleuser@gmail.com" };
    const expectedUser = { ...googleUser, authUser: true };

    const newState = authReducer(undefined, googleLogin(googleUser));

    expect(newState.user).toEqual(expectedUser);
    expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
      "authUser",
      JSON.stringify(expectedUser)
    );
    expect(sessionStorageMock.setItem).toHaveBeenCalledWith("expiry", expect.any(Number));
  });

  test("should logout user", () => {
    const loggedInState = {
      user: { name: "TestUser", email: "test@gmail.com", password: "Test@1234", authUser: true },
    };

    const newState = authReducer(loggedInState, logout());

    expect(newState.user).toEqual({
      name: "",
      email: "",
      password: "",
      authUser: false,
    });

    expect(sessionStorageMock.clear).toHaveBeenCalled();
  });
});
