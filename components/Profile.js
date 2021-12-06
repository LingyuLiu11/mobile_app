import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View, ImageBackground } from "react-native";

const supportedURL = "https://warhammer-1.herokuapp.com/builds";
const image = { uri: "https://cdn.cloudflare.steamstatic.com/steam/apps/1142710/ss_854d0bf8784b7d38e6e0ea921c8417f33932406f.1920x1080.jpg?t=1636038739" };
const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    return <Button title={children} onPress={handlePress} />;
};

const Profile = () => {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      <OpenURLButton url={supportedURL}>See existing builds</OpenURLButton>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});

export default Profile;