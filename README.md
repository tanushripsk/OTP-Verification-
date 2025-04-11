How i impliment this 
imported packages are 
1.react-icons: For icons.
2.otp-input-react: For entering OTP in a styled way.
3.react-phone-input-2: For international phone number input.
4.firebase: To use Firebase authentication.
5.react-hot-toast: To display toast notifications.

# React Component: App
const [otp, setOtp] = useState("");
const [ph, setPh] = useState("");
const [loading, setLoading] = useState(false);
const [showOTP, setShowOTP] = useState(false);
const [user, setUser] = useState(null);

These control:
otp: the OTP entered by the user
ph: the phone number entered
loading: whether an action is in progress
showOTP: whether to show the OTP input
user: the authenticated user (if successfully logged in)


💡 Summary Flow:
User enters a phone number ➡️ clicks Send OTP.
reCAPTCHA gets triggered invisibly.
Firebase sends OTP.
User enters OTP ➡️ clicks Verify.
Firebase verifies OTP ➡️ shows success message.

