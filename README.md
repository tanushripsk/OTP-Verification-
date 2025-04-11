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



<!-- steps of firebase -->
1.goto firebase console using url https://firebase.google.com/
2.create firebase project
3.goto authentication section and copy the auth
4. in authentication section enable the phone number authentication so you can get otp
5.in your code editor run comment in sequence wise
I. npm install firebase
Ii. otp-input-react
Iii. react-hot-toast
Iv. react-phone-input-2
V. react-icons

<!-- create on file as firebaseconfig.js) -->
this file will contain all the firebase config
and it should have to created in src main folder