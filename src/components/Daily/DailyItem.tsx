import React from 'react';
import {Div, Image, Text} from 'react-native-magnus';
import {
  container_bg,
  grey_text,
  primary,
  height,
  width,
} from '../../constants/theme';
import {IMain} from '../../types';

type Props = {
  data: IMain;
  timestamp: string;
  icon: string;
};

const DailyItem: React.FC<Props> = (props: Props) => {
  const APPMTime = (str_date: string) => {
    const time_str = str_date.split(' ')[1];
    const time_sep = time_str.split(':');
    let hours = time_sep[0];
    let ampm = parseInt(hours) >= 12 ? 'pm' : 'am';
    let hours_val = parseInt(hours) % 12;
    hours_val = hours_val ? hours_val : 12;
    var strTime = hours_val + ampm;
    return strTime;
  };
  return (
    <Div
      mx={'sm'}
      flex={1}
      flexDir={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Div
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        bg={container_bg}
        rounded={'2xl'}>
        <Image
          m={'xl'}
          h={height * 0.1}
          w={width * 0.15}
          source={{
            uri: `https://openweathermap.org/img/wn/${props.icon}@2x.png`,
          }}
        />
      </Div>
      <Text
        fontFamily="DMSans-Bold"
        color={grey_text}
        my={height * 0.01}
        fontSize={'2xl'}
        lineHeight={23.44}>
        {APPMTime(props?.timestamp)}
      </Text>
      <Text
        fontFamily="DMSans-Bold"
        color={primary}
        fontSize={'6xl'}
        lineHeight={41.66}>
        {props?.data?.temp?.toPrecision(2)}
        {'\u00b0'}C
      </Text>
    </Div>
  );
};

export default DailyItem;
