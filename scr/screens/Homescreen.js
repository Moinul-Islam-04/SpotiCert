import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Homescreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is the home screen!</Text>
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Homescreen;