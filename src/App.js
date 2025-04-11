import { useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";    
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyATHNxYmRm1C65bosiiwV-5c0k89eB6mXM",
  authDomain: "opt-verification-97075.firebaseapp.com",
  projectId: "opt-verification-97075",
  storageBucket: "opt-verification-97075.firebasestorage.app",
  messagingSenderId: "536159322901",
  appId: "1:536159322901:web:84841aa220a297d7845f1c",
  measurementId: "G-94Y5VSHFTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  // Setup invisible reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          onSignup(); // reCAPTCHA solved, continue with signup
        },
        "expired-callback": () => {
          toast.error("reCAPTCHA expired, please try again.");
        }
      });
    }
  };

  // Send OTP to phone number
  function onSignup() {
    setLoading(true);
    setupRecaptcha();

    const phoneNumber = "+" + ph;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Failed to send OTP. Try again.");
      });
  }

  // Verify entered OTP
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        toast.success("Login successful!");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("OTP verification failed.");
      });
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div> {/* Required for reCAPTCHA */}

        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍 Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> CODE A PROGRAM
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                />
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor="phone"
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
