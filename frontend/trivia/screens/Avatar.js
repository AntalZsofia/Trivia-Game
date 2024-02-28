
import React from 'react';
import { Image } from 'react-native';

// Define a mapping from avatar names to require statements
export const avatarImages = {
    'bunny': {
        'original': require('../assets/avatars/bunny.jpg'),
        'greyscale': require('../assets/avatars/bunny_greyscale.jpg'),
    },
    'fox': {
        'original': require('../assets/avatars/fox.jpg'),
        'greyscale': require('../assets/avatars/fox_greyscale.jpg'),
    },
    'lion': {
        'original': require('../assets/avatars/lion.jpg'),
        'greyscale': require('../assets/avatars/lion_greyscale.jpg'),
    },
    'coala': {
        'original': require('../assets/avatars/coala.jpg'),
        'greyscale': require('../assets/avatars/coala_greyscale.jpg'),
    },
    'dog': {
        'original': require('../assets/avatars/dog.jpg'),
        'greyscale': require('../assets/avatars/dog_greyscale.jpg'),
    },
    'tiger': {
        'original': require('../assets/avatars/tiger.jpg'),
        'greyscale': require('../assets/avatars/tiger_greyscale.jpg'),
    },
};

export default function Avatar({ name, filter, style }) {
    if (!avatarImages[name]) {
        console.error(`Avatar name "${name}" not found in avatarImages`);
        return null;
    }
    return <Image source={avatarImages[name][filter]} style={style} />;
}