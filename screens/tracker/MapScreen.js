import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const INITIAL_COORDINATE = {
    latitude: 48.9226, // Початкова точка (наприклад, Вінниця)
    longitude: 24.7097,
  };

  const [coordinates, setCoordinates] = useState([INITIAL_COORDINATE]); // Масив координат
  const [countdown, setCountdown] = useState(5); // Зворотний відлік починається з 5

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          // Обчислення нової точки
          setCoordinates((prevCoordinates) => {
            const lastCoordinate = prevCoordinates[0];
            const newCoordinate = {
              latitude: lastCoordinate.latitude + 0.0001 ,
              longitude: lastCoordinate.longitude , // 0.0001 приблизно дорівнює 10 метрам у широті
            };
            console.log(newCoordinate);
            return [newCoordinate]; // Очищаємо старі точки та додаємо нову
          });
          return 5; // Скидаємо таймер
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000); // Оновлювати щосекунди
  
    return () => clearInterval(interval); // Очищати таймер при виході з компонента
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: INITIAL_COORDINATE.latitude,
          longitude: INITIAL_COORDINATE.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            coordinate={coord}
            title={`Точка ${index + 1}`}
            description={`Широта: ${coord.latitude}, Довгота: ${coord.longitude}`}
            image={require('../../assets/icons/19.png')} // Додаємо зображення машини
          />
        ))}
      </MapView>

      {/* Таймер зворотного відліку */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{countdown}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  timerContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  timerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MapScreen;
