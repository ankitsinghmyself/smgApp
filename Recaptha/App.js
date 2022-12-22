import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3'
const App = () => {
  const [recaptcha, setRecaptcha] = React.useState('');
  return (
    <View>
      <Text>Recaptha Test App</Text>
      <ReCaptchaV3
          captchaDomain={'https://staging.eure.cab/'}
          siteKey={'6LcDIX0hAAAAAHQAYSX9KTXk190XaBvug-_PPieG'}
          onReceiveToken={(token) => setRecaptcha(token) }
      />
      <Text>{recaptcha}</Text>
    </View>
  )
}
//Site key // 6LcDIX0hAAAAAHQAYSX9KTXk190XaBvug-_PPieG
//secret key // 6LcDIX0hAAAAABF_cVMcPAaFL4O6ggjbeTLTcpbr

export default App

const styles = StyleSheet.create({})