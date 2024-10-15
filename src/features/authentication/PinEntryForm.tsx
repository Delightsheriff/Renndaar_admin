import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PinEntry() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [resendTime, setResendTime] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle PIN submission logic here
    console.log("Submitted PIN:", pin.join(""));
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <h2 className="text-2xl font-bold text-center text-blue_gray-100 mb-4">
        ENTER YOUR PIN
      </h2>
      <p className="text-center text-blue_gray-100 mb-6">
        Please enter your 4 digit PIN to proceed
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-6">
          {pin.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-14 h-14 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-blue_main-100 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          ))}
        </div>
        <div className="text-center mb-6">
          {resendTime > 0 ? (
            <span className="text-sm text-blue_gray-200">
              Resend in <span className="text-blue-600">{resendTime} secs</span>
            </span>
          ) : (
            <div className="text-center text-sm text-blue_gray-200 py-4">
              Didn't get the pin ? &nbsp;
              <Link to="/resend" className="text-blue_main-100 hover:underline">
                Resend
              </Link>
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-blue_main-100 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          PROCEED
        </Button>
      </form>
    </div>
  );
}
