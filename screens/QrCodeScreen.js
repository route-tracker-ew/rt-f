import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button ,TouchableOpacity } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { getParcelByPhone } from "../services/parcel/ParcelService";


const QrCodeScreen = ({ navigation })  => {
  const [facing, setFacing] = useState('back');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  
  const handleBarcodeScanned = async ({ type, data }) => {
    setScanned(true);
   var parcels = await getParcelByPhone(data)
   navigation.navigate("ParcelList", {
     parcels: parcels
   });
  };
  
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
    <CameraView style={styles.camera} facing={facing}  onBarcodeScanned={scanned ? undefined : handleBarcodeScanned} barcodeScannerSettings={{barcodeTypes: ["qr", "pdf417"]}}> 
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default QrCodeScreen;
