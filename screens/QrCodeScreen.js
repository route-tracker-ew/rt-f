import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { getQrCode } from "../services/qr/QrCodeService";
import LoadingModal from "../components/LoadingModal";

const QrCodeScreen = ({}) => {
  const [loading, setLoading] = useState(false);

  const [qrCodeBase64, setQRCodeBase64] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        setLoading(true);
        const qrCodeBlob = await getQrCode(400, 400);
        const reader = new FileReader();
        reader.readAsDataURL(qrCodeBlob);
        reader.onloadend = () => {
          const dataUrl = reader.result;
          setQRCodeBase64(dataUrl);
        };
      } catch (error) {
        console.error("Error fetching QR code:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQrCode();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LoadingModal visible={loading} />
      {qrCodeBase64 && (
        <Image
          source={{ uri: qrCodeBase64 }}
          style={{ width: 400, height: 400, borderRadius: 10 }}
        />
      )}
    </View>
  );
};

export default QrCodeScreen;
