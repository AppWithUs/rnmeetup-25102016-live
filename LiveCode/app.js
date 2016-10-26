import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import MapView from 'react-native-maps';
import Button from 'apsl-react-native-button';

import MeetupApi from './meetup';

export default class RNMeetup extends Component {

  state = {
    region: {
      latitude: 53.55,
      longitude: 9.99,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    },
    markers: [],
  }

  onChangeRegion = (region) => {
    this.setState({
      region,
    });
  }

  findMeetups = () => {
    MeetupApi
    .findMeetups(this.state.region, (err, meetups) => {
      if (err) {
        alert(err);
      }

      let markers = meetups.map((m, idx) => {
        return {
          key: `marker-${idx}`,
          title: m.name,
          description: m.description,
          coordinate: {
            latitude: m.venue.lat,
            longitude: m.venue.lon,
          }
        }
      });

      this.setState({
        markers,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>
          Meetup Finder
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChange={this.onChangeRegion}
          >
            {
              this.state.markers.map((m) => {
                return (
                  <MapView.Marker
                    {...m}
                  />
                );
              })
            }
          </MapView>
          <View style={styles.buttonRow}>
            <Button
              onPress={this.findMeetups}
            >
            Click Me!
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  h1: {
    fontSize: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 25,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  }
});
