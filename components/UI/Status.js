import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Status(props) {
    const statusBar = `
        <div style="width: 100px; height: 100px; border-radius: 50px; background-color: ${
            props.status === 'Pending' ? 'red' : props.status === 'In Progress' ? 'yellow' : 'green'
        };"></div>
        <h6>${props.status}</h6>
    `;

    return (
        <View style={styles.container}>
            <WebView source={{ html: statusBar }} style={styles.webView} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 120, // Adjust width as needed
        height: 120, // Adjust height as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    webView: {
        width: '100%',
        height: '100%',
    }
});
