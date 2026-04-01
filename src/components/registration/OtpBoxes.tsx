"use client";

import { useEffect, useState } from "react";

const OTP_LENGTH = 6;

export default function OtpSection({
  label, // "email" | "WhatsApp"
}: {
  label: string;
}) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(30);

  // Timer logic
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle change
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      document.getElementById(`otp-${label}-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${label}-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp([...newOtp, ...Array(OTP_LENGTH - newOtp.length).fill("")]);
  };

  return (
    <div className="mt-4 gap-y-1 flex flex-col">
      {/* Heading */}
      <p className="text-xs text-[var(--text-muted)] mb-2">
        * Enter OTP sent to your {label}
      </p>

      {/* OTP Boxes */}
      <div
        className="flex justify-start gap-2"
        onPaste={handlePaste}
      >
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${label}-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-10 h-12 text-center text-lg border rounded-lg outline-none focus:border-[var(--primary)]"
          />
        ))}
      </div>

      {/* Resend */}
      <p className="text-xs mt-2 text-[var(--text-muted)]">
        {timer > 0 ? (
          <>Resend OTP in {timer}s</>
        ) : (
          <div>
            Didn’t receive OTP?{" "}
            <span
              onClick={() => {
                setTimer(30);
                console.log(`Resend OTP for ${label}`);
              }}
              className="text-[var(--primary)] cursor-pointer font-medium"
            >
              Resend OTP
            </span>
          </div>
        )}
      </p>
    </div>
  );
}