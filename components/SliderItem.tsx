import { View, Text,Image } from 'react-native'
import React from 'react'
 type ImageSliderType={
title:string;
image:string;
category:string;
time:string;
author:string
}

type Props = {
    item:ImageSliderType;
    index:number;
}

const SliderItem = ({item,index}: Props) => {
  return (
    <View>
      <Image source={{ uri: item.image }} style={{ width: 300, height: 500 }} />


      <Text>{item.title}</Text>
    </View>
  )
}

export default SliderItem