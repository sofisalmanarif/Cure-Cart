import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useUserRegisterMutation } from "../redux/api/userAPI";
import toast from "react-hot-toast";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userRegister] =useUserRegisterMutation()
  // const navigate = useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    // Perform login authentication logic here
    console.log("Email:", email);
    console.log("Password:", password);
    const res = await userRegister({
      name,
      email,
      password
    })
    
    if("data" in res){
      toast.success(res.data.msg)
      localStorage.setItem("token", res.data.token);
      navigate("/");
    }
    else{
      
       toast.error(res.error.data.msg)
       navigate("/Login");
      
    }
    
     
   } catch (error) {
    toast.error("SignIn Failed")
    
   }
  };

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="bg-white bg-opacity-40 backdrop-blur-lg rounded-lg overflow-hidden max-w-sm w-full">
        <div className="py-10 px-8">
          <div className="flex justify-center items-center mb-5">
            <img
              src="../../../pictures/smalllogo.png"
              width={"190px"}
              alt="LOGO"
            />
          </div>
          <h2 className="text-center text-2xl font-extrabold text-[#2278b1]">
            Create your account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div className="mb-4">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="mb-4">
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <IoEye /> : <IoEyeOff />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-md text-white bg-[#2278b1] hover:bg-[#2787c7]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Already a member
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
