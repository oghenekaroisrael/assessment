import React from 'react';
import {Div, Image, Text} from 'react-native-magnus';
import {primary, height, width} from '../../constants/theme';
import {IMain, IWeather} from '../../types';

type Props = {
  data?: IMain;
  weather?: IWeather;
};

const CurrenWeather: React.FC<Props> = (props: Props) => {
  return (
    <Div mx={15}>
      <Text
        fontFamily="DMSans-Regular"
        fontWeight={'400'}
        lineHeight={20.83}
        fontSize={16}>
        Today
      </Text>
      <Div>
        <Div>
          <Text fontFamily="DMSans-Bold" my={5} fontSize={96} color={primary}>
            {props?.data?.temp.toPrecision(2)}
            {'\u00b0'}C
          </Text>
        </Div>

        <Div flexDir={'row'} justifyContent={'space-between'}>
          <Div>
            <Text fontFamily="DMSans-Bold" fontSize={'2xl'} lineHeight={23.44}>
              {props?.weather?.main}
            </Text>
            <Text
              fontFamily="DMSans-Regular"
              fontSize={'xl'}
              lineHeight={18.23}>
              {props?.weather?.description}
            </Text>
          </Div>
          <Div>
            <Image
              h={height * 0.15}
              w={width * 0.25}
              source={{
                uri: `https://openweathermap.org/img/wn/${props?.weather?.icon}@2x.png`,
              }}
            />
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default CurrenWeather;
