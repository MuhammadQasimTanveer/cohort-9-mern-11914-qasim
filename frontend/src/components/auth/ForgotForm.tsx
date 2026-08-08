import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPassSchema,
  type ForgotPassData,
} from "../../lib/validations/authSchema";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Link } from "react-router-dom";

export const ForgotForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPassData>({
    resolver: zodResolver(forgotPassSchema),
  });

  const onSubmit = async (data: ForgotPassData) => {
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

      <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
        Send reset Link
      </Button>

      <Link to="/login" className="text-primary font-medium hover:underline text-center">
        Back to Login
      </Link>
    </form>
  );
};
