import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const navigate = useNavigate();

  const onGoToDashboard = () => {
    // Logic to redirect or go back to login
    navigate("/dashboard", { replace: true }); // Replace the current URL with /login
    console.log("Back to login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password update API request
    // Replace this with your actual API call for updating the password
    if (newPassword === confirmPassword) {
      setTimeout(() => {
        // On successful password update
        setPasswordUpdated(true);
      }, 1000);
    } else {
      alert("Passwords do not match!");
    }
    // Handle password update logic here
    console.log("Password update requested:", { newPassword, confirmPassword });
  };
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      {!passwordUpdated ? (
        <>
          <div className="flex items-center justify-center mb-6">
            <img src="/logo.svg" alt="Logo" />
          </div>
          <h2 className="text-2xl font-bold text-center text-blue_gray-100 mb-4">
            NEW PASSWORD
          </h2>
          <p className="text-center text-blue_gray-100 mb-6">
            Create a new and strong password for your account.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="new-password"
                placeholder="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border-none  rounded-md text-blue_gray-200 bg-blue_gray-300"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="confirm-password"
                placeholder="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border-none  rounded-md text-blue_gray-200 bg-blue_gray-300"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              UPDATE PASSWORD
            </Button>
          </form>
        </>
      ) : (
        // Render confirmation message once the password has been updated

        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            PASSWORD RESET SUCCESSFUL
          </h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset.
          </p>
          <Button
            onClick={onGoToDashboard}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            GO TO DASHBOARD
          </Button>
        </div>
      )}
    </div>
  );
}
