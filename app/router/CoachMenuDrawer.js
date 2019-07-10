import React from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Image,
	Text
} from 'react-native';
import { isSignedIn, getData } from "../components/auth";

import { onSignOut, clearData } from "../components/auth";
import firebase from 'react-native-firebase';
import { COACH, GUEST, PARENT, PLAYER } from "../components/Constants";
import BaseComponent, { defaultStyle } from '../containers/BaseComponent'


export default class CoachMenuDrawer extends BaseComponent {

	constructor(props) {
		super(props)
		this.state = {
			signedIn: false,
			user_type: '',
			fullName: '',
			mobileNumber: ''
		};

		getData('userInfo', (value) => {
			userData = (JSON.parse(value))


			console.log("SplashScreen=> ", userData);
			this.setState({
				user_type: userData.user['user_type'],
				fullName: userData.user['name'],
				mobileNumber: userData.user['mobile_number'],
			})
		});
	}

	componentDidMount() {
		isSignedIn()
			.then(res => {
				this.setState({ signedIn: res })
			})
	}

	getWithoutLoggedMenu() {

		return (
			<View>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							About Dribble
						</Text>

						<Image
							style={styles.arrow_img}
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
							sstyle={styles.arrow_img}
							source={require('../images/right_icon.png')}
						>

						</Image>

					</View>
				</TouchableOpacity>
			</View>)
	}

	getCoachMenu() {

		return (
			<View>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							View Academy feedback
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Browse Academies
								</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu}>Find Vacancies</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu}>View my Feedback</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu}>Reward Points</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu}>Challenge leaderboard</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu}>Challenge Disputes</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu}>About Dribble</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu}>Contact Us</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>
					</View>
				</TouchableOpacity>
			</View>)
	}

	getPlayerMenu() {

		return (
			<View>

				<View style={{
					paddingLeft: 16,
					paddingRight: 16,
					paddingTop: 12,
					paddingBottom: 12,
				}}>

					<Text style={defaultStyle.regular_text_10}>
						Guardian
					</Text>

					<View style={{
						flexDirection: 'row',
						flex: 1,
						marginTop: 8,
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>

						<Text
							numberOfLines={1}
							style={[defaultStyle.bold_text_16, { width: 90 }]}>Prithviraj Pankaj</Text>
						<Text style={defaultStyle.regular_text_12}>+91 9833245623</Text>
						<Text style={defaultStyle.regular_text_blue_10}>Edit</Text>
					</View>
				</View>

				<View style={{
					paddingLeft: 16,
					paddingRight: 16,
					paddingTop: 12,
					paddingBottom: 12,
				}}>



					<Text style={defaultStyle.regular_text_10}>
						Players
					</Text>

					<View style={{
						flexDirection: 'row',
						flex: 1,
						marginTop: 8,
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>

						<Text
							numberOfLines={1}
							style={[defaultStyle.bold_text_16, { width: 90 }]}>Prithviraj Pankaj</Text>
						<Text style={defaultStyle.regular_text_12}>+91 9833245623</Text>
						<Text style={defaultStyle.regular_text_blue_10}>Edit</Text>
					</View>
					<View style={{
						flexDirection: 'row',
						flex: 1,
						marginTop: 5,
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>

						<Text
							numberOfLines={1}
							style={[defaultStyle.bold_text_16, { width: 90 }]}>Prithviraj Pankaj</Text>
						<Text style={defaultStyle.regular_text_12}>+91 9833245623</Text>
						<Text style={defaultStyle.regular_text_blue_10}>Edit</Text>
					</View>
				</View>


				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Diet Plan
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						>

						</Image>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Payment
								</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Reward Points
								</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Browse Academies
								</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							View Coach feedback
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Share App
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							About Dribble
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Contact Us
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							FAQ
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/right_icon.png')}
						/>

					</View>
				</TouchableOpacity>
			</View>)
	}

	render() {


		let signedIn = this.state.signedIn
		let user_type = this.state.user_type
		let fullame = this.state.fullName
		let mobileNumber = this.state.mobileNumber
		let menu;
		//user_type = COACH
		//signedIn = true
		if (!signedIn) {
			menu = this.getWithoutLoggedMenu()
			fullName = "Guest"
			mobileNumber = "-"
		}
		else if (user_type != null) {

			if (user_type == GUEST) {

			} else if (user_type == PLAYER) {

				menu = this.getPlayerMenu()

			} else if (user_type == COACH) {
				menu = this.getCoachMenu()
			}
			else if (user_type == PARENT) {

				menu = this.getPlayerMenu()
			}
		}

		return (
			<ScrollView style={styles.container}>

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

								<View style={{
									flexDirection: 'row',
									flex: 1,
									justifyContent: 'space-between'
								}}>

									<Image
										style={{ height: 25, width: 80, }}
										source={require('../images/dribble_logo.png')}
									/>

									{/* <Image
										style={{
											height: 30, width: 30,
										}}
										source={require('../images/ic_close.png')}
									/> */}
								</View>

								{!signedIn ?

									<View>

										<Text
											style={{
												color: 'black',
												fontFamily: 'Quicksand-Medium',
												fontSize: 14, marginTop: 16,
											}}>
											Guest</Text>

										<Text
											style={{
												color: '#667DDB',
												fontFamily: 'Quicksand-Medium',
												fontSize: 14, marginTop: 8,
											}}>
											Sign In</Text>
									</View>

									:
									<View>

										<Text
											style={{
												color: 'black',
												fontFamily: 'Quicksand-Medium',
												fontSize: 14,
												marginTop: 16
											}}>
											{fullame}</Text>

										<Text
											style={{
												color: '#A3A5AE',
												fontFamily: 'Quicksand-Medium',
												fontSize: 14, marginTop: 8
											}}>
											{mobileNumber}
										</Text>


										<TouchableOpacity activeOpacity={.8} onPress={() => {
											this.props.navigation.navigate('EditProfile')
										}}>

											<View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
												<Image
													style={{
														width: 12,
														height: 12, borderRadius: 8
													}}
													source={require('../images/edit_profile.png')}
												></Image>

												<Text
													style={{
														color: '#667DDB',
														fontFamily: 'Quicksand-Medium',
														fontSize: 14, marginLeft: 4
													}}
												>
													Edit
								</Text>
											</View>
										</TouchableOpacity>

									</View>
								}


							</View>

						</View>


						<View
							style={{
								paddingLeft: 10, paddingRight: 10,
								paddingBottom: 16
							}}
						>

							{menu}


							{signedIn ?
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

									</View>
								</TouchableOpacity>
								:
								<TouchableOpacity activeOpacity={0.8} onPress={() => {
									this.props.navigation.navigate('Login')
								}
								}>


									<View style={styles.drawercell}>
										<Text style={styles.menu}>
											Sign In
								</Text>


									</View>
								</TouchableOpacity>
							}



						</View>
					</View>

				</View>
			</ScrollView>

		)
	}
}

const styles = StyleSheet.create({


	menu: {
		color: '#404040',
		alignItems: 'flex-start',
		fontSize: 16,
		fontFamily: 'Quicksand-Medium',
	},
	arrow_img: {
		height: 16,
		width: 7
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
		//padding: 16,
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 12,
		paddingBottom: 12,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	container: {
		flex: 1,
		backgroundColor: '#F7F7F7'
	},
})


