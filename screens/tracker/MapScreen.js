import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [countdown, setCountdown] = useState(5); // Зворотний відлік починається з 5

  // Таймер для зворотного відліку
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown === 1 ? 5 : prevCountdown - 1));
    }, 1000); // Оновлювати щосекунди
    return () => clearInterval(interval); // Очищати таймер при виході з компонента
  }, []);

  // Обробник для натискання на карту
  const handleMapPress = (event) => {
    setMarkerPosition(event.nativeEvent.coordinate);
  };

  // Обробник для кнопки перезавантаження
  const handleReload = () => {
    setMarkerPosition(null); // Скидаємо позицію маркера
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.9226, // Початкова точка (наприклад, Вінниця)
          longitude: 24.7097,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={handleMapPress}
      >
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            title="Обрана точка"
            description={`Широта: ${markerPosition.latitude}, Довгота: ${markerPosition.longitude}`}
            image={require('../../assets/icons/19.png')} // Замінити на ваш шлях до іконки
          />
        )}

        {/* Відображаємо текст AB4041HP над маркером */}
        {markerPosition && (
          <View style={[styles.labelContainer, { top: markerPosition.latitude, left: markerPosition.longitude }]}>
            <Text style={styles.labelText}>AB4041HP</Text>
          </View>
        )}
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
  // Стиль для таймера
  timerContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Напівпрозорий фон
    padding: 10,
    borderRadius: 5,
  },
  timerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Стиль для кнопки перезавантаження
  reloadButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  reloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Стиль для контейнера з текстом
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default MapScreen;
