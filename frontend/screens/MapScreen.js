import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {
  return <MapView
    initialRegion={{
      latitude: 39.9517,
      longitude: 75.1912,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }}
    zoomEnabled
    scrollingEnabled
  >
      {/* <Marker
          coordinate={{
              latitude: 39.9517,
              longitude: 75.1912,
            }}
          title="Daniel Tao"
      /> */}
  </MapView>
}
