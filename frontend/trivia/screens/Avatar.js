
import React from 'react';
import { Image } from 'react-native';

// Define a mapping from avatar names to require statements
export const avatarImages = {
    fox: require('../assets/avatars/fox.jpg'),
    lion: require('../assets/avatars/lion.jpg'),
    coala: require('../assets/avatars/coala.jpg'),
    dog: require('../assets/avatars/dog.jpg'),
    tiger: require('../assets/avatars/tiger.jpg'),
    bunny: require('../assets/avatars/bunny.jpg'),
};

export default function Avatar({ name, style }) {
    return <Image source={avatarImages[name]} style={style} />;
}