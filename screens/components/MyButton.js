import { Text, View,TouchableOpacity } from 'react-native';

function MyButton(props) {
    const {text,style,click} = props
    return (
        <View>
            <TouchableOpacity onPress={click}>
                <Text style={style}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MyButton;