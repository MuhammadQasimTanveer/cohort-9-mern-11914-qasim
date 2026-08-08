import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type SignupFormData,
  signupSchema,
} from "../../lib/validations/authSchema";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";


export const SignupForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log("You form has been submitted!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Full Name"
        type="name"
        placeholder="Zami Holmes"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
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
      <div>
      <div className="flex items-center gap-2">
        <input
          id="agreeToTerms"
          type="checkbox"
          className="h-4 w-4"
          {...register("agreeToTerms")}
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
          I agree to the Terms of Service and Privacy Policy
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="form-error">{errors.agreeToTerms.message}</p>
      )}
    </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
        Create Account
      </Button>
    </form>
  );
};
