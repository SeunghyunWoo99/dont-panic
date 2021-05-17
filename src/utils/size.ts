import { Dimensions } from 'react-native'

/** 화면 가로 길이 */
const screenWidth = Dimensions.get('window').width
/** 화면 세로 길이 */
const screenHeight = Dimensions.get('window').height

export default {
  screenWidth,
  screenHeight,
}
