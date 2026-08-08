import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormData,
} from "../../lib/validations/authSchema";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("You form has been submitted!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="zami.holmes@gmail.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      {/* Forgot password link */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input id="rememberMe" type="checkbox" className="h-4 w-4" />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>

        <Link
          to="/forgot-password"
          className="text-xs text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
        Login
      </Button>
    </form>
  );
};
