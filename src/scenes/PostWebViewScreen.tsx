import React from 'react'
import WebView from 'react-native-webview'

export default function PostWebViewScreen(props: {
  route: {
    params: { uri: string }
  }
}) {
  const { uri } = props.route.params

  return <WebView source={{ uri }} />
}
