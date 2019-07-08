import React from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native';
import { Text, Button } from 'react-native-paper'
import { onSignOut, clearData } from "../components/auth";
import firebase from 'react-native-firebase';


export default class CoachMenuDrawer extends React.Component {

	constructor(props) {
		super(props)

	}

	componentDidMount() {
	}

	render() {
		return (
			<View style={styles.container}>

				<View
					style={{

					}}
				>

					<View
						style={{
							paddingLeft: 10, paddingRight: 10, paddingTop: 16,
							paddingBottom: 16,
							flexDirection: 'row', backgroundColor: 'white', marginBottom: 12
						}}
					>
						<Image
							style={{ width: 128, height: 128, borderRadius: 8 }}
							source={require('../images/guest_profile.png')}
						></Image>

						<View
							style={{
								justifyContent: 'center',
								marginLeft: 10,

							}}
						>

							<Text
								style={{ color: 'black', fontSize: 14 }}
							>
								Guest

							</Text>

							<Text
								style={{ color: '#A3A5AE', fontSize: 14, marginTop: 8 }}
							>
								+91---------

							</Text>


							<TouchableOpacity activeOpacity={.8} onPress={() => {
								this.props.navigation.navigate('EditProfile')
							}}>

								<View style={{ marginTop: 8, flexDirection: 'row', }}>
									<Image
										style={{ width: 12, height: 12, borderRadius: 8 }}
										source={require('../images/edit_profile.png')}
									></Image>

									<Text
										style={{ color: '#667DDB', fontSize: 14, marginLeft: 4 }}
									>
										Edit
								</Text>
								</View>
							</TouchableOpacity>


						</View>

					</View>


					<View
						style={{
							paddingLeft: 10, paddingRight: 10, paddingTop: 16,
							paddingBottom: 16
						}}
					>

						<TouchableOpacity activeOpacity={0.8} onPress={() => {
							this.props.navigation.navigate('HomeScreen')
							this.props.navigation.closeDrawer();
						}}>

							<View style={styles.drawercell}>

								<Text style={styles.menu}>
									Browse Academies
						</Text>

								<Image
									style={{ height: 16, width: 7 }}
									source={require('../images/right_icon.png')}
								>

								</Image>

							</View>

						</TouchableOpacity>


						<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

							<View style={styles.drawercell}>

								<Text style={styles.menu}>
									About Dribble
						</Text>

								<Image
									style={{ height: 16, width: 7 }}
									source={require('../images/right_icon.png')}
								>

								</Image>

							</View>
						</TouchableOpacity>

						<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

							<View style={styles.drawercell}>

								<Text style={styles.menu}>
									Contact Us
								</Text>

								<Image
									style={{ height: 16, width: 7 }}
									source={require('../images/right_icon.png')}
								>

								</Image>

							</View>
						</TouchableOpacity>

						<TouchableOpacity activeOpacity={0.8} onPress={() => {
							onSignOut()
							clearData()
							firebase.auth().signOut();
							this.props.navigation.navigate('Login')
						}
						}>


							<View style={styles.drawercell}>
								<Text style={styles.menu}>
									Sign Out
							</Text>

								<Image
									style={{ height: 16, width: 7 }}
									source={require('../images/right_icon.png')}
								>

								</Image>

							</View>
						</TouchableOpacity>


					</View>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({


	menu: {
		color: '#404040',
		alignItems: 'flex-start',
		fontSize: 16,

	},
	filled_button: {
		width: '90%',
		padding: 12,
		borderRadius: 22,
		marginLeft: 4,
		marginRight: 4,
		marginTop: 8,
		backgroundColor: '#67BAF5',
		color: 'white',
		textAlign: 'center',
	},
	drawercell: {
		padding: 16,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	container: {
		flex: 1,
		backgroundColor: '#F7F7F7'
	},
})


