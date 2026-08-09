import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Signup } from "../../pages/Signup";

const mocked = vi.hoisted(() => ({
  navigate: vi.fn(),
  signup: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
  isAuthenticated: false,
}));


vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mocked.navigate,
  };
});

vi.mock("../../store/authStore", () => ({
  useAuthStore: () => ({
    signup: mocked.signup,
    isAuthenticated: mocked.isAuthenticated,
  }),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: mocked.toastSuccess,
    error: mocked.toastError,
  },
}));


const renderSignup = () =>
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  describe("Signup Page", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mocked.isAuthenticated = false;
    });
  
    test("shows validation errors for invalid inputs", async () => {
      const user = userEvent.setup();
      renderSignup();
  
      await user.type(screen.getByLabelText(/full name/i), "A");
      await user.type(screen.getByLabelText(/email/i), "invalid@domain");
      await user.type(screen.getByLabelText(/^password$/i), "123");
  
      await user.click(screen.getByRole("button", { name: /create account/i }));
  
      await waitFor(() => {
        expect(document.querySelectorAll(".form-error").length).toBeGreaterThan(0);
      });
  
      const errors = Array.from(document.querySelectorAll(".form-error"));
  
      expect(
        errors.some((el) => /email|valid/i.test(el.textContent ?? ""))
      ).toBe(true);
  
      expect(errors.some((el) => /8|uppercase|number|min/i.test(el.textContent ?? ""))).toBe(true);
      expect(errors.some((el) => /agree|terms/i.test(el.textContent ?? ""))).toBe(true);
  
      expect(mocked.signup).not.toHaveBeenCalled();
    });


    test("calls signup with correct data", async () => {
      const user = userEvent.setup();
  
      mocked.signup.mockResolvedValueOnce(undefined);
  
      renderSignup();
  
      await user.type(screen.getByLabelText(/full name/i), "Test User");
      await user.type(screen.getByLabelText(/email/i), "test@example.com");
      await user.type(screen.getByLabelText(/^password$/i), "Password1");
      await user.click(screen.getByLabelText(/i agree to the terms of service and privacy policy/i));
  
      await user.click(screen.getByRole("button", { name: /create account/i }));
  
      expect(mocked.signup).toHaveBeenCalledWith(
        "Test User",
        "test@example.com",
        "Password1"
      );
    });

    test("shows toast when signup fails", async () => {
      const user = userEvent.setup();
  
      mocked.signup.mockRejectedValueOnce(new Error("Email already exists"));
  
      renderSignup();
  
      await user.type(screen.getByLabelText(/full name/i), "Test User");
      await user.type(screen.getByLabelText(/email/i), "test@example.com");
      await user.type(screen.getByLabelText(/^password$/i), "Password1");
      await user.click(screen.getByLabelText(/i agree to the terms of service and privacy policy/i));
  
      await user.click(screen.getByRole("button", { name: /create account/i }));
  
      expect(mocked.toastError).toHaveBeenCalledWith("Email already exists");
      expect(mocked.navigate).not.toHaveBeenCalled();
    });


    test("redirects to dashboard after successful signup", async () => {
      const user = userEvent.setup();
  
      mocked.signup.mockResolvedValueOnce(undefined);
  
      renderSignup();
  
      await user.type(screen.getByLabelText(/full name/i), "Test User");
      await user.type(screen.getByLabelText(/email/i), "test@example.com");
      await user.type(screen.getByLabelText(/^password$/i), "Password1");
      await user.click(screen.getByLabelText(/i agree to the terms of service and privacy policy/i));
  
      await user.click(screen.getByRole("button", { name: /create account/i }));
  
      expect(mocked.toastSuccess).toHaveBeenCalledWith("Welcome to our dashboard!");
      expect(mocked.navigate).toHaveBeenCalledWith("/dashboard");
    });


  });