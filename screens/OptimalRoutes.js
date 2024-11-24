import * as Linking from 'expo-linking';
import { Button, View, Text, ScrollView, StyleSheet } from 'react-native';

const OptimalRoutes = () => {
  const cities = ['Вінниця', 'Хмельницький', 'Львів'];

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=Zaporizhzhia&destination=Rivne&waypoints=Dnipro|Kropyvnytskyi|Vinnytsia|Khmelnytskyi|Ternopil|Chernivtsi|Zhytomyr|Odesa|Kyiv|Kharkiv|Lviv|Cherkasy|Poltava|Mykolaiv|Zaporizhzhia|Rivne&travelmode=driving`;

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список міст для поїздки:</Text>
      
      {/* Номерований список міст з можливістю скролу */}
      <ScrollView style={styles.scrollView}>
        {cities.map((city, index) => (
          <Text key={index} style={styles.city}>
            {index + 1}. {city}
          </Text>
        ))}
      </ScrollView>
      
      {/* Кнопка для генерації маршруту */}
      <Button title="Відкрити маршрут" onPress={openGoogleMaps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 150, // Обмеження висоти для скролу
    marginBottom: 20,
  },
  city: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default OptimalRoutes;
