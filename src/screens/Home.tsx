import React, {useEffect, useState} from 'react';
import {Alert, FlatList} from 'react-native';
import {Button, Div, Header, Text, Icon} from 'react-native-magnus';
import DailyItem from '../components/Daily/DailyItem';
import CurrenWeather from '../components/Weather/CurrenWeather';
import {white, height, width} from '../constants/theme';
import RNLocation from 'react-native-location';
import {fetchWeatherData, fetchForecastData} from '../services/weather';
import {IResponse} from '../types';

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<IResponse>();
  const [forecast, setforecast] = useState<IResponse[]>([]);

  const loadData = async (lon: number | undefined, lat: number | undefined) => {
    const {payload, error} = await fetchWeatherData(lon, lat);
    if (payload?.main) {
      setWeatherData(payload);
    } else {
      console.log(error);
      Alert.alert('Error', 'An error occured while fetching data from API');
    }
  };

  const loadForecastData = async (
    lon: number | undefined,
    lat: number | undefined,
  ) => {
    const {payload, error} = await fetchForecastData(lon, lat);
    if (payload) {
      setforecast(payload);
    } else {
      console.log(error);
      Alert.alert('Error', 'An error occured while fetching data from API');
    }
  };
  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then(granted => {
      if (granted) {
        RNLocation.getLatestLocation().then(locs => {
          loadData(locs?.longitude, locs?.latitude);
          loadForecastData(locs?.longitude, locs?.latitude);
        });
      }
    });
  }, []);
  return (
    <Div flex={1} bg={white} style={{height: height * 1, width: width * 1}}>
      {/* Header section */}
      <Header
        p="lg"
        shadow={0}
        alignment="left"
        prefix={
          <Button bg="transparent">
            <Icon
              name="chevron-left"
              color="#000"
              fontFamily="Feather"
              fontSize="4xl"
            />
          </Button>
        }
        suffix={
          <Button bg="transparent">
            <Icon
              name="align-justify"
              color="#000"
              fontFamily="Feather"
              fontSize={'4xl'}
            />
          </Button>
        }
      />

      {/* Current Weather Section */}
      <CurrenWeather
        data={weatherData?.main}
        weather={weatherData?.weather[0]}
      />

      {/* Forecast Section */}
      <Div
        w={width * 1}
        flex={1}
        position={'absolute'}
        bottom={height * 0.15}
        mt={height * 0.2}
        mb={height * 0.05}>
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal
          contentContainerStyle={{flexGrow: 1}}
          data={forecast}
          renderItem={({item, index}) => (
            <DailyItem
              key={`forecast-${index}`}
              data={item?.main}
              timestamp={item?.dt_txt}
              icon={item?.weather[0]?.icon}
            />
          )}
        />
      </Div>

      {/* Humidity and Pressure Section */}
      <Div
        position={'absolute'}
        bottom={height * 0.05}
        flexDir={'row'}
        h={height * 0.1}
        w={width * 1}>
        <Div
          flexDir={'row'}
          borderColor={'grey'}
          borderWidth={1}
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}>
          <Div
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Text
              fontFamily="DMSans-Regular"
              fontSize={'2xl'}
              lineHeight={23.44}
              fontWeight={'300'}>
              Pressure
            </Text>
            <Text
              fontFamily="DMSans-Regular"
              fontSize={'2xl'}
              lineHeight={23.44}
              fontWeight={'300'}
              mx={'sm'}>
              {' '}
              |{' '}
            </Text>
            <Text fontFamily="DMSans-Bold" fontSize={'2xl'} lineHeight={23.44}>
              {weatherData?.main?.pressure}
            </Text>
            <Text
              fontFamily="DMSans-Regular"
              fontSize={'2xl'}
              lineHeight={23.44}
              fontWeight={'300'}>
              hPa
            </Text>
          </Div>
        </Div>
        <Div
          flexDir={'row'}
          borderColor={'grey'}
          borderWidth={1}
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}>
          <Div
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Text
              fontFamily="DMSans-Regular"
              fontSize={'2xl'}
              lineHeight={23.44}
              fontWeight={'300'}>
              Humidity
            </Text>
            <Text
              fontFamily="DMSans-Regular"
              fontSize={'2xl'}
              lineHeight={23.44}
              fontWeight={'300'}
              mx={'sm'}>
              |
            </Text>
            <Text fontFamily="DMSans-Bold" fontSize={'2xl'} lineHeight={23.44}>
              {weatherData?.main?.humidity}
            </Text>
            <Text
              fontFamily="DMSans-Regular"
              fontSize={'2xl'}
              lineHeight={23.44}
              fontWeight={'300'}>
              %
            </Text>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default Home;
