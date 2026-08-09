import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../../pages/Login";

const mocked = vi.hoisted(() => ({
  navigate: vi.fn(),
  login: vi.fn(),
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
    login: mocked.login,
    isAuthenticated: mocked.isAuthenticated,
  }),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: mocked.toastSuccess,
    error: mocked.toastError,
  },
}));

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocked.isAuthenticated = false;
  });

  test("renders login form", () => {
    renderLogin();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /forgot password\?/i })).toHaveAttribute(
      "href",
      "/forgot-password"
    );
  });

  test("updates input values", async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    await user.type(emailInput, "test@example.com");

    expect(emailInput).toHaveValue("test@example.com");
  });

  test("shows validation errors for invalid inputs", async () => {
    const user = userEvent.setup();
    renderLogin();

    // Use a value that typically passes native email input checks but fails Zod's stricter schema.
    await user.type(screen.getByLabelText(/email/i), "invalid@domain");
    await user.type(screen.getByLabelText(/password/i), "123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(document.querySelectorAll(".form-error").length).toBeGreaterThan(0);
    });

    const validationErrors = Array.from(document.querySelectorAll(".form-error"));

    expect(validationErrors.length).toBeGreaterThan(0);
    expect(
      validationErrors.some((el) =>
        /password|8 characters|min/i.test(el.textContent ?? "")
      )
    ).toBe(true);
    expect(mocked.login).not.toHaveBeenCalled();
  });

  test("submits valid credentials and redirects to dashboard", async () => {
    const user = userEvent.setup();
    mocked.login.mockResolvedValueOnce(undefined);
    renderLogin();

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "Password1");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mocked.login).toHaveBeenCalledWith("test@example.com", "Password1");
    expect(mocked.toastSuccess).toHaveBeenCalledWith("Welcome back!");
    expect(mocked.navigate).toHaveBeenCalledWith("/dashboard");
  });

  test("shows error toast when login fails", async () => {
    const user = userEvent.setup();
    mocked.login.mockRejectedValueOnce(new Error("Invalid credentials"));
    renderLogin();

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "Password1");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mocked.toastError).toHaveBeenCalledWith("Invalid credentials");
    expect(mocked.navigate).not.toHaveBeenCalledWith("/dashboard");
  });

  test("redirects authenticated user to dashboard on mount", () => {
    mocked.isAuthenticated = true;
    renderLogin();

    expect(mocked.navigate).toHaveBeenCalledWith("/dashboard");
  });
});