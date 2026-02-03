import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';

const htmlAsset = Asset.fromModule(require('./assets/index.html'));

export default function App() {
  const [htmlUri, setHtmlUri] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadHtml = async () => {
      await htmlAsset.downloadAsync();
      if (isMounted) {
        setHtmlUri(htmlAsset.localUri ?? htmlAsset.uri);
      }
    };

    loadHtml();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {htmlUri ? (
        <WebView
          source={{ uri: htmlUri }}
          originWhitelist={['*']}
          allowFileAccess
          allowUniversalAccessFromFileURLs
          javaScriptEnabled
          domStorageEnabled
        />
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
