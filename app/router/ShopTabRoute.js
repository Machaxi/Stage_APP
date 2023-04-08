import { createStackNavigator } from "react-navigation";
import ShopScreen from "../containers/ShopScreen/ShopScreen";

const ShopTabRoute = createStackNavigator({
    ShopHomeScreen: {
        screen: ShopScreen,
        // navigationOptions: ({ navigation }) => ({
        //     title: 'Shop',
        //     headerTitleStyle: style.headerStyle,
        //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        //         showBackAction={true}
        //     />,
        //     headerRight: <RightMenuToolbar navigationProps={navigation}
        //         navigation={navigation} showNotification={false} />,
        //     headerStyle: {
        //         backgroundColor: '#FFFFFF',
        //     },

        //     headerTintColor: '#000',
        // }),
    }
})

export default ShopTabRoute;
