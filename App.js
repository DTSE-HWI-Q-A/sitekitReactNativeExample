/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from "react";
 import {
   View,
   Button,
   Switch,
   ScrollView,
   Text,
   TextInput,
 } from "react-native";
 import RNHMSSite from "@hmscore/react-native-hms-site";
 
 import { styles } from "./src/styles";

 const defaultLocation = {
  location: {
    lat: -33.4284912,
    lng: -70.609782,
  },
  bounds: {
    northeast: {
      lat: 49,
      lng: 2.47,
    },
    southwest: {
      lat: 47.8815,
      lng: 2.0,
    },
  },
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      strictBounds: false,
      query: "Santiago",
      radius: 1000,
      lat: defaultLocation.location.lat,
      lng: defaultLocation.location.lng
    };
  }

  componentDidMount() {
    const config = {
      apiKey: "CgB6e3x9WY6f9V+JC6+05x6/68lDIuarjSxQVxqvYcL9O5h1t6EJ78J5vYkaURkSm06cj2xWcz+umN7d/AmmGayJ",
    };

    RNHMSSite.initializeService(config)
      .then(() => {
        console.log("El servicio se inicializó con exito");
      })
      .catch((err) => {
        console.log("Error : " + err);
      }
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.container]}>
          <TextInput
            value={this.state.query}
            style={[styles.input, styles.width35]}
            placeholder="query"
            onChangeText={(e) => this.changeInputValue("query", e)}
          />
          <TextInput
            value={this.state.radius ? this.state.radius.toString() : null}
            keyboardType="number-pad"
            maxLength={5}
            style={[styles.input, styles.width35]}
            placeholder="radius"
            onChangeText={(e) => this.changeRadiusValue(e)}
          />
          <View style={[styles.switchContainer]}>
            <Text>Strict Bounds</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={this.state.strictBounds ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={this.toggleSwitch}
              value={this.state.strictBounds}
            />
          </View>
        </View>
        <View>
          <Button title="Text Search" onPress={this.onTextSearch} />
        </View>

        <View style={styles.btnContainer}>
          <Button title="Detail Search" onPress={this.onDetailSearch} />
        </View>

        <View style={styles.btnContainer}>
          <Button title="Query Suggestion" onPress={this.onQuerySuggestion} />
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Query AutoComplete"
            onPress={this.onQueryAutocomplete}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button title="Restaurantes cercanos" onPress={this.onNearbySearchRestaurants} />
        </View>

        {/* <View style={styles.btnContainer}>
          <Button title="Gym cercanos" onPress={this.onNearbySearchGym} />
        </View> */}

        <View style={styles.btnContainer}>
          <Button title="Create Widget" onPress={this.createWidget} />
        </View>

      </ScrollView>
    );
  }

  onTextSearch = () => {
    let textSearchReq = {
      query: this.state.query,
      location: {
        lat: this.state.lat,
        lng: this.state.lng,
      },
      radius: this.state.radius,
      countryCode: "CL",
      language: "es",
      pageIndex: 1,
      pageSize: 5,
      hwPoiType: RNHMSSite.HwLocationType.RESTAURANT,
      poiType: RNHMSSite.LocationType.GYM,
      children: true,
    };
    RNHMSSite.textSearch(textSearchReq)
      .then((res) => {
        alert(JSON.stringify(res));
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log(JSON.stringify(err));
      });
  };

  onDetailSearch = () => {
    let detailSearchReq = {
      siteId: "2116626084C8358C26700F373E49B9EF",
      language: "es",
      children: false,
    };
    RNHMSSite.detailSearch(detailSearchReq)
      .then((res) => {
        alert(JSON.stringify(res));
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log(JSON.stringify(err));
      });
  };

  changeInputValue(key, data) {
    data.length < 1 ? (data = "") : data;
    this.setState({
      [key]: data,
    });
  }

  changeRadiusValue(data) {
    data = data.replace(/[^0-9]/g, "");
    data == "" ? data : (data = Number(data));

    this.setState({
      radius: data,
    });
  }

  toggleSwitch = () => {
    this.setState({ strictBounds: !this.state.strictBounds });
    console.log("StrictBounds: " + !this.state.strictBounds);
  };

  onQuerySuggestion = () => {
    let querySuggestionReq = {
      ...defaultLocation,
      query: this.state.query,
      radius: this.state.radius,
      countryCode: "CL",
      language: "es",
      poiTypes: [
        RNHMSSite.LocationType.GEOCODE,
        RNHMSSite.LocationType.ADDRESS,
        RNHMSSite.LocationType.ESTABLISHMENT,
        RNHMSSite.LocationType.REGIONS,
        RNHMSSite.LocationType.CITIES,
      ],
      strictBounds: this.state.strictBounds,
      children: false,
    };
    RNHMSSite.querySuggestion(querySuggestionReq)
      .then((res) => {
        alert(JSON.stringify(res));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log(JSON.stringify(err));
      });
  };

  onQueryAutocomplete = () => {
    let queryAutocompleteReq = {
      query: this.state.query,
      location: {
        lat: this.state.lat,
        lng: this.state.lng,
      },
      radius: this.state.radius,
      language: "es",
      children: false,
    };
    RNHMSSite.queryAutocomplete(queryAutocompleteReq)
      .then((res) => {
        alert(JSON.stringify(res));
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log(JSON.stringify(err));
      });
  };

  onNearbySearchRestaurants = () => {
    let nearbySearchReq = {
      query: this.state.query,
      location: {
        lat: this.state.lat,
        lng: this.state.lng,
      },
      radius: this.state.radius,
      hwPoiType: RNHMSSite.HwLocationType.RESTAURANT,
      poiType: RNHMSSite.LocationType.GYM,
      language: "cl",
      pageIndex: 1,
      pageSize: 5,
      strictBounds: this.state.strictBounds,
    };
    RNHMSSite.nearbySearch(nearbySearchReq)
      .then((res) => {
        alert(JSON.stringify(res));
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log(JSON.stringify(err));
      });
  };



  createWidget = () => {
    let params = {
      searchIntent: {
        apiKey: "<api_key>",
        hint: "myhint",
      },

      searchFilter: {
        ...defaultLocation,
        query: this.state.query,
        radius: this.state.radius,
        language: "es",
        countryCode: "CL",
        poiTypes: [
          RNHMSSite.LocationType.GEOCODE,
          RNHMSSite.LocationType.ADDRESS,
          RNHMSSite.LocationType.ESTABLISHMENT,
          RNHMSSite.LocationType.REGIONS,
          RNHMSSite.LocationType.CITIES,
        ],
        strictBounds: this.state.strictBounds,
        children: false,
      },
    };

    RNHMSSite.createWidget(params)
      .then((res) => {
        alert(JSON.stringify(res));
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log(JSON.stringify(err));
      });
  };
}

export default App;
