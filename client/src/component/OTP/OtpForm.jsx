import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { storageHelper } from '../utils/storage';
import { verifyToken } from '../../service/auth.service';

import QRCode from "react-qr-code";

function OTPForm() {
  const [otp, setOTP] = useState('');
  const [qrValue, setQrValue] = useState(null)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = {
      token: otp,
      userId: storageHelper.user._id
    }

    const response = await verifyToken(reqBody);
    const data = await response.json();
    if (response.ok) {
      toast.success("Successfully Verified Token");
    } else {

    }

  };
  useEffect(() => {
    // const qr = storageHelper.user.qrCode;
    // console.log("user : ", storageHelper.user.qrCode);
    // // console.log("user : ", storageHelper.user.qrCodeUri);
    // console.log("QR  :", qr);
    // setQrValue(qr)
    const qr = storageHelper.user.qrCodeUri;
    console.log("user : ", storageHelper.user.qrCodeUri);
    console.log("QR  :", qr);
    setQrValue(qr)
  }, [])

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md  bg-white rounded-lg shadow-md dark:border dark:border-gray-700">
        {
          qrValue &&
          <div className="p-6 space-y-4 items-center display-flex justify-center">

            <h1 className="block mb-2 text-sm font-medium text-blue-900 dark:text-white">
              Scan The QR code to Genrate Token
            </h1>

            <div className="flex flex-col items-center justify-center">
              {/* <img src={qrValue} /> */}
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "25%", width: "25%" }}
                value={qrValue}
                viewBox={`0 0 256 256`}
              />
            </div>

          </div>

        }
        <div className="p-6 space-y-4">

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your OTP
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your 6-digit OTP"
                required
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                maxLength={6}
              />
            </div>
            <button
              type="submit"
              className="w-full p-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Verify OTP
            </button>
          </form>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Didn't receive an OTP?{' '}
            <Link to="/resend-otp" className="text-primary-600 hover:underline dark:text-primary-500">
              Resend OTP
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer containerId={"Otp"}
      
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
}

export default OTPForm;
