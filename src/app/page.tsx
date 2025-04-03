"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [qrCode, setQrCode] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      const { data } = await axios.post(
        "https://qr-code-generator-production-1ecc.up.railway.app/qr-code"
      );
      setQrCode(data.qrCode);
      setUrl(data.url);
    };

    fetchQRCode();
    const interval = setInterval(fetchQRCode, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>Scan QR Code for 10 Random Movies</h1>
      {qrCode && <img src={qrCode} alt="QR Code" />}
      <p>URL: {url}</p>
    </div>
  );
}
