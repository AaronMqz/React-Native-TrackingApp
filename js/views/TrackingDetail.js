import React from 'react';
import {View, Button, Text} from 'react-native';

export default function TrackingDetail({navigation}) {
  const [count, setCount] = React.useState(0);

  // Example how to add a header button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Count" />
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 100}}>{count}</Text>
    </View>
  );
}
