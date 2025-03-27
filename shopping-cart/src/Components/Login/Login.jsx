import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { login, googleLogin } from "../../features/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", password: "" });
  const [errors, setErrors] = useState({ name: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const user = useSelector((state) => state.user.user);
  const { authUser } = user;

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse?.credential;
    if (!token) return;

    setIsLoading(true);
    const decodedUser = JSON.parse(atob(token.split('.')[1]));
  
    dispatch(googleLogin({
      name: decodedUser.name,
      email: decodedUser.email,
    }));
  };

  const handleError = () => {
    console.log("Google Login failed");
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", password: "" };
    
    if (!values.name.trim()) {
      newErrors.name = "Username is required";
      isValid = false;
    }
    
    if (!values.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      setIsLoading(true);
      dispatch(login(values));
      
      // Use a timeout to wait for the auth state to update
      // This is a workaround since we can't chain promises directly
      setTimeout(() => {
        // If login is still in progress, we'll let the useEffect handle navigation
        if (!authUser) {
          setIsLoading(false);
        }
      }, 2000);
    };

  if (authUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <Typography variant="paragraph">Loading...</Typography>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/markus-spiske-WIpNUhklTQg-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      
      {/* Card with increased z-index to appear above the overlay */}
      <Card className="w-full max-w-sm shadow relative z-10 bg-white bg-opacity-95">
        <div className="text-center pt-6">
          <Typography variant="h4" color="blue-gray" className="font-medium">
            LOGIN 
          </Typography>
          <Typography variant="small" color="gray" className="mt-1">
            Enter your credentials to access your account
          </Typography>
        </div>

        <form onSubmit={handleSubmit}>
          <CardBody className="pt-4">
            <div className="space-y-4">
              {/* Custom styled username field */}
              <div className="relative">
                <div className={`flex items-center border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all`}>
                  <div className="pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={onChange}
                    placeholder="Enter your username or email"
                    className="block w-full pl-2 pr-3 py-2 border-0 outline-none focus:ring-0 sm:text-sm"
                    autoComplete="username"
                  />
                </div>
                {errors.name && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.name}
                  </Typography>
                )}
              </div>
              
              {/* Custom styled password field */}
              <div className="relative">
                <div className={`flex items-center border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all`}>
                  <div className="pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    className="block w-full pl-2 pr-3 py-2 border-0 outline-none focus:ring-0 sm:text-sm"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.password}
                  </Typography>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <Checkbox label="Remember Me" labelProps={{ className: "text-sm" }} />
                <Typography 
                  as="a" 
                  href="#forgot-password" 
                  variant="small" 
                  color="blue" 
                  className="text-sm hover:underline"
                >
                  Forgot password?
                </Typography>
              </div>
            </div>
          </CardBody>
          
          <CardFooter className="pt-0 pb-6 px-6">
            <Button 
              variant="gradient" 
              fullWidth 
              type="submit"
              className="mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
            
            <div className="relative flex items-center justify-center mt-2 mb-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <Typography variant="small" className="mx-4 text-gray-500">or</Typography>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="flex justify-center">
              <GoogleOAuthProvider clientId="739525286836-g62agtqcddamp8mks6kg89t250kosbj7.apps.googleusercontent.com">
                <GoogleLogin 
                  onSuccess={handleSuccess} 
                  onError={handleError}
                  size="medium"
                  theme="outline"
                  text="signin_with"
                />
              </GoogleOAuthProvider>
            </div>
            
            <Typography variant="small" className="text-center mt-4 text-gray-600">
              Don't have an account?{" "}
              <Typography
                as="a"
                href="#sign-up"
                variant="small"
                color="blue"
                className="font-medium hover:underline"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;