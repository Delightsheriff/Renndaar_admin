import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMoveBack } from "@/hooks/useMoveBack";
import { Check } from "lucide-react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ResetForm() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const onBackToLogin = () => {
    // Logic to redirect or go back to login
    navigate("/login", { replace: true }); // Replace the current URL with /login
    console.log("Back to login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Password reset requested for:", email);

    setTimeout(() => {
      // On successful API call
      setEmailSent(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      {!emailSent ? (
        <>
          <div className="flex items-center justify-center mb-6">
            <img src="/logo.svg" alt="Logo" />
          </div>
          <div className="flex items-center mb-6">
            <Button
              className="text-blue_gray-100 bg-transparent border-none shadow-none rounded-none hover:bg-transparent"
              onClick={moveBack}
            >
              <FaArrowLeft />
            </Button>
            <h2 className="text-xl font-bold text-blue_gray-100">
              RECOVER PASSWORD
            </h2>
          </div>
          <p className="text-blue_gray-200 mb-6 text-center">
            You will receive a password reset link in your email address, click
            on the link to reset your password
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border-none rounded-md text-blue_gray-200 bg-blue_gray-300"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              RESET PASSWORD
            </Button>
          </form>
        </>
      ) : (
        // Render confirmation message once the email is sent
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">LINK SENT</h2>
          <p className="text-gray-600 mb-6">
            A password reset link has been successfully sent to
            <br />
            <span className="text-blue-600">{email}</span>
          </p>
          <Button
            onClick={onBackToLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            BACK TO LOGIN
          </Button>
        </div>
      )}
    </div>
  );
}
