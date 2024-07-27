import axios from 'axios';
import { Text } from 'react-native';

const apiFirestore = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects/${process.env.EXPO_PUBLIC_PROJECT_ID}/databases/(default)`,
});

export default function Feed() {
  return <Text>Posts</Text>;
}
