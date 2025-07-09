import { MingcuteGoogleFill } from "@/components/icon/Google";
import { IcOutlineFacebook } from "@/components/icon/Facebook";
import postLogin from "../../assets/poster_login3.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import { authService } from "@/features/auth/services/auth.service";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});
type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitFormLogin = async (values: LoginValues) => {
    try {
      const response = await authService.login(values);
      console.log(response);
      toast.success("Login successful!");
      dispatch(
        loginSuccess({ userEmail: values.email, token: response.token })
      );

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4  from-gray-50 to-gray-100">
      <Card className="w-full max-w-5xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[40rem]">
          {/* Left side - Illustration and text */}
          <div className="md:w-1/2 flex flex-col justify-center items-center p-8 border-r-2">
            <div className="text-center max-w-lg">
              <img
                src={postLogin}
                alt="English Learning Illustration"
                className="object-contain max-h-[300px] w-full mb-6 rounded-lg"
              />
              <h1 className="text-3xl font-semibold mb-4">
                Master English with Confidence
              </h1>
              <p className="text-lg ">
                Join thousands of learners improving their English skills every
                day
              </p>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="md:w-1/2 flex flex-col justify-center p-8 bg-white">
            <div className="w-full max-w-md mx-auto">
              <CardHeader className="text-center pb-6 px-0">
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Log in to continue learning English with EnglishMate
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-0">
                <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(handleSubmitFormLogin)}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-between">
                      <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 mb-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="p-0"
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor="remember"
                              className="text-sm font-normal mb-0"
                            >
                              Remember me
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <a
                        href="/forgot"
                        className="text-sm text-teal-500 hover:text-teal-600 hover:underline transition-colors duration-300"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                    >
                      Log In
                    </Button>
                  </form>
                </Form>

                <div className="space-y-4">
                  <div className="relative">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-3 text-sm text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
                    >
                      <MingcuteGoogleFill className="w-4 h-4 text-red-500" />
                      <span>Google</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
                    >
                      <IcOutlineFacebook className="w-4 h-4 text-blue-600" />
                      <span>Facebook</span>
                    </Button>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-teal-500 hover:text-teal-600 hover:underline font-medium transition-colors duration-300"
                  >
                    Sign up
                  </a>
                </p>
              </CardContent>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
