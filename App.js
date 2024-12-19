import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import LogoScreen from "./screens/LogoScreen";
import AuthScreen from "./screens/AuthScreen";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import Search from "./screens/Profile";
import Offers from "./screens/Offers";
import PickupScreen from "./screens/parcel/PickupScreen";
import RouteScreen from "./screens/route/RouteScreen";
import QrCodeScreen from "./screens/QrCodeScreen";
import CreateNewRouteScreen from "./screens/route/CreateNewRouteScreen";
import DriverScreen from "./screens/route/DriverScreen";
import CarScreen from "./screens/route/CarScreen";
import AddNewCarScreen from "./screens/route/AddNewCarScreen";
import AddNewWorkerScreen from "./screens/route/AddNewWorkerScreen";
import AddReceiverScreen from "./screens/parcel/AddReciverScreen";
import AddSenderAddressScreen from "./screens/parcel/AddSenderAddressScreen";
import AddReciverAddressScreen from "./screens/parcel/AddReciverAddressScreen";
import SelectRouteForParcels from "./screens/parcel/SelectRouteForParcels";
import AddSenderScreen from "./screens/parcel/AddSenderScreen";
import SelectRouteForParcel from "./screens/parcel/SelectRouteForParcel";
import ParcelScreen from "./screens/parcel/ParcelScreen";
import ParcelList from "./screens/parcel/ParcelList";
import GpsScreen from "./screens/route/GpsScreen";
import EditPickupScreen from "./screens/parcel/EditPickupScreen";
import EditParcelScreen from "./screens/parcel/EditParcelScreen";
import EditReceiverAddressScreen from "./screens/parcel/EditReciverAddressScreen";
import EditReceiverScreen from "./screens/parcel/EditReceiverScreen";
import EditSenderAddressScreen from "./screens/parcel/EditSenderAddressScreen";
import EditSenderScreen from "./screens/parcel/EditSenderScreen";
// import OptimalRoutes from "./screens/OptimalRoutes";
import RequestParcelScreen from "./screens/parcel/request/RequestParcelScreen";
import RequestPickupScreen from "./screens/parcel/request/RequestPickupScreen";
import RequestReceiverScreen from "./screens/parcel/request/RequestReceiverScreen";
import RequestReceiverAddressScreen from "./screens/parcel/request/RequestReciverAddressScreen";
import RequestSenderAddressScreen from "./screens/parcel/request/RequestSenderAddressScreen";
import RequestSenderScreen from "./screens/parcel/request/RequestSenderScreen";
import TrackerRouteForParcels from "./screens/tracker/TrackerRouteForParcels";
import TrackerCarScreen from "./screens/tracker/TrackerCarScreen";
import MapScreen from "./screens/tracker/MapScreen";
// import SelectOptimalRouteForParcels from "./screens/optimalRoute/SelectOptimalRouteForParcels";
import SelectOptimalRouteForParcels from "./screens/optimalRoute/SelectOptimalRouteForParcels";
import OptimalRoutes from "./screens/optimalRoute/OptimalRoutes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Пропозиції"
        component={Offers}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? "percent" : "percent-outline"}
                size={24}
                color="black"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Основне"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color="black"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Профіль"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color="black"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Logo"
          component={LogoScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Authentication"
          component={AuthStack}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name="OptimalRoutes"
          component={OptimalRoutes}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Оптимальний маршурт",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}
        />

        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Gps-tracker",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}
        />

         <Stack.Screen
          name="TrackerRouteForParcels"
          component={TrackerRouteForParcels}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Маршурти для трекінгу",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}
        />

         <Stack.Screen
          name="TrackerCarScreen"
          component={TrackerCarScreen}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Авто для трекінгу",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}
        />

        <Stack.Screen
          name="Pickup"
          component={PickupScreen}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Нова накладна",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}
        />
        <Stack.Screen
          name="RouteScreen"
          component={RouteScreen}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Маршрути",
            headerBackTitle: "Назад",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("CreateNewRouteScreen")}
              >
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="CreateNewRouteScreen"
          component={CreateNewRouteScreen}
          options={({}) => ({
            headerTintColor: "black",
            headerTitle: "Створити новий маршрут",
            headerBackTitle: "Назад",
          })}
        />

        <Stack.Screen
          name="DriverScreen"
          component={DriverScreen}
          options={({}) => ({
            headerTintColor: "black",
            headerTitle: "Cписок водіїв",
            headerBackTitle: "Назад",
          })}
        />

        <Stack.Screen
          name="CarScreen"
          component={CarScreen}
          options={({}) => ({
            headerTintColor: "black",
            headerTitle: "Cписок автомобілів",
            headerBackTitle: "Назад",
          })}
        />

        <Stack.Screen
          name="AddNewCarScreen"
          component={AddNewCarScreen}
          options={({}) => ({
            headerTintColor: "black",
            headerTitle: "Створити новий автомобіль",
            headerBackTitle: "Назад",
          })}
        />

        <Stack.Screen
          name="AddNewWorkerScreen"
          component={AddNewWorkerScreen}
          options={({}) => ({
            headerTintColor: "black",
            headerTitle: "Додати робітника",
            headerBackTitle: "Назад",
          })}
        />

        <Stack.Screen
          name="QrCodeScreen"
          component={QrCodeScreen}
          options={({}) => ({
            headerTintColor: "black",
            headerTitle: "Qr-code",
            headerBackTitle: "Назад",
          })}
        />

        <Stack.Screen
          name="SelectOptimalRouteForParcels"
          component={SelectOptimalRouteForParcels}
          options={({}) => ({
            headerTintColor: "black",
            headerTitle: "Виберніть маршрут для розрахунку",
            headerBackTitle: "Назад",
          })}
        />

        <Stack.Screen
          name="AddReceiverScreen"
          component={AddReceiverScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="AddSenderAddressScreen"
          component={AddSenderAddressScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="AddSenderScreen"
          component={AddSenderScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="AddReceiverAddressScreen"
          component={AddReciverAddressScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="ParcelScreen"
          component={ParcelScreen}
          options={({}) => ({
            headerShown: true,
            headerTintColor: "black",
            headerTitle: "",
            headerBackTitle: "Назад",
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="SelectRouteForParcel"
          component={SelectRouteForParcel}
          options={({}) => ({
            headerTintColor: "black",
            headerTitle: "Оберіть маршрут",
            headerBackTitle: "Назад",
          })}
        />

        <Stack.Screen
          name="SelectRouteForParcels"
          component={SelectRouteForParcels}
          options={({}) => ({
            headerTintColor: "black",
            headerTitle: "Оберіть маршрут",
            headerBackTitle: "Назад",
          })}
        />


        <Stack.Screen
          name="EditPickupScreen"
          component={EditPickupScreen}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Редагування посилки",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}

        /> 
        <Stack.Screen
          name="EditParcelScreen"
          component={EditParcelScreen}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Редагування посилки",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}
        />

        <Stack.Screen
          name="EditSenderScreen"
          component={EditSenderScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="EditSenderAddressScreen"
          component={EditSenderAddressScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="EditReceiverAddressScreen"
          component={EditReceiverAddressScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />


          <Stack.Screen
          name="EditReceiverScreen"
          component={EditReceiverScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />


<Stack.Screen
          name="RequestPickupScreen"
          component={RequestPickupScreen}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Редагування посилки",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}

        /> 
        <Stack.Screen
          name="RequestParcelScreen"
          component={RequestParcelScreen}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Редагування посилки",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}
        />

        <Stack.Screen
          name="RequestSenderScreen"
          component={RequestSenderScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="RequestSenderAddressScreen"
          component={RequestSenderAddressScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="RequestReceiverAddressScreen"
          component={RequestReceiverAddressScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />


          <Stack.Screen
          name="RequestReceiverScreen"
          component={RequestReceiverScreen}
          options={({}) => ({
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          })}
        />

        <Stack.Screen
          name="ParcelList"
          component={ParcelList}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Посилки",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}
        />

        <Stack.Screen
          name="GpsScreen"
          component={GpsScreen}
          options={({ navigation }) => ({
            headerTintColor: "black",
            headerTitle: "Gps tracker",
            headerBackTitle: "Назад",
            navigation: navigation,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
