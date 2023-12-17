import { useState } from 'react';
import { ImageProps, Image } from 'react-native';
import { isDefined } from '../util/isDefined';

type Props = {} & ImageProps;

export default function FallbackImage(props: Props) {
  const [error, setError] = useState(!isDefined(props.source));

  return (
    <>
      {error ? (
        <Image
          {...props}
          source={require('../../assets/images/fallback.png')}
        />
      ) : (
        <Image
          {...props}
          onError={(e) => {
            console.log('Image error:', e);
            setError(true);
          }}
        />
      )}
    </>
  );
}
