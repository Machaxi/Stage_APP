import React from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Image,
	Text,
} from 'react-native';
import { isSignedIn, getData } from "../components/auth";

import { onSignOut, clearData } from "../components/auth";
import firebase from 'react-native-firebase';
import { COACH, GUEST, PARENT, PLAYER } from "../components/Constants";
import BaseComponent, { defaultStyle } from '../containers/BaseComponent'
import { getRelationsDetails } from "../redux/reducers/ProfileReducer";
import { connect } from 'react-redux';

class CoachMenuDrawer extends BaseComponent {

	constructor(props) {
		super(props)
		this.state = {
			signedIn: false,
			user_type: '',
			fullName: '',
			mobileNumber: '',
			academy_id: '',
			player_id: '',
			academy_rating: '',
			academy_name: '',
			related_players: [],
			related_guardians: []
		};


		getData('userInfo', (value) => {
			userData = (JSON.parse(value))


			console.log("SplashScreen=> ", userData);
			this.setState({
				user_type: userData.user['user_type'],
				fullName: userData.user['name'],
				mobileNumber: userData.user['mobile_number'],
				player_id: userData.player_id,
				academy_id: userData.academy_id,
				academy_rating: userData.academy_rating,
				academy_name: userData.academy_name,

			})

			if (userData.user['user_type'] == 'PLAYER' ||
				userData.user['user_type'] == 'PARENT' ||
				userData.user['user_type'] == 'FAMILY') {

				this.fetchParentDetails()
			}

		});
	}

	fetchParentDetails() {
		getData('header', (value) => {

			this.props.getRelationsDetails(value).then(() => {

				let data = this.props.data.profileData
				console.log('getRelationsDetails payload ' + JSON.stringify(this.props.data.profileData));
				if (data.success) {

					this.setState({
						related_players: data.data.players,
						related_guardians: data.data.guardians
					})
					console.warn("related ", JSON.stringify(this.state.related_players))
				}
			}).catch((response) => {
				console.log(response);
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

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('CoachMyFeedbackListing')}>
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

	 parentCell = (obj) => {
		return <View style={{
			flexDirection: 'row',
			flex: 1,
			marginTop: 8,
			alignItems: 'center',
			justifyContent: 'space-between'
		}}>
			<Text
				numberOfLines={1}
				style={[defaultStyle.bold_text_16, { width: 90 }]}>{obj.name}</Text>
			<Text style={defaultStyle.regular_text_12}>{obj.phone_number}</Text>

			<TouchableOpacity
				onPress={() => {
					//this.props.navigation.navigate('EditOtherProfile', { data: obj })
				}}
			>
				<Text style={defaultStyle.regular_text_blue_10}>Edit</Text>
			</TouchableOpacity>
		</View>
	  }

	getPlayerMenu() {
		let related_players = this.state.related_players
		let size = related_players.length
		let related_players_array = []
		for (let i = 0; i < size; i++) {
			let obj = related_players[i]
			related_players_array.push(
				this.parentCell(obj)
			)
		}

		let related_guardians = this.state.related_guardians
		size = related_guardians.length
		let related_guardians_array = []
		for (let i = 0; i < size; i++) {
			let obj = related_guardians[i]
			related_guardians_array.push(
				this.parentCell(obj)
			)
		}

		return (
			<View>


				{this.state.related_players.length != 0
					?
					<View style={{
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 12,
						paddingBottom: 12,
					}}>
						<Text style={defaultStyle.regular_text_10}>
							Guardian
						</Text>
						{related_guardians_array}
					</View>
					: null}


				{this.state.related_players.length != 0
					?
					<View style={{
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 12,
						paddingBottom: 12,
					}}>
						<Text style={defaultStyle.regular_text_10}>
							Players
						</Text>
						{related_players_array}
					</View>
					: null}



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


				<View style={{
					paddingLeft: 16,
					paddingRight: 16,
					paddingTop: 12,
					paddingBottom: 4,
				}}>



					<Text style={defaultStyle.regular_text_10}>
						Academy Feedback
					</Text>

					<View style={{
						flexDirection: 'row',
						flex: 1,
						marginTop: 8,
						marginBottom: 4,
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>

						<Text
							numberOfLines={1}
							style={[defaultStyle.bold_text_16, { width: 200 }]}>{this.state.academy_name}</Text>

						<View style={{
							flexDirection: 'row'
						}}>

							<Image
								style={{
									width: 14,
									height: 14
								}}
								source={require('../images/ic_star.png')}
							/>
							<Text style={[defaultStyle.regular_text_blue_10, {
								borderRadius: 8,
								borderWidth: 1,
								color: '#707070',
								paddingLeft: 4,
								paddingRight: 4,
								paddingTop: 2,
								paddingBottom: 2,
								marginLeft: 4,
								borderColor: '#DFDFDF'
							}]}>4.5</Text>

						</View>
					</View>

					<TouchableOpacity
						activeOpacity={.8}
						onPress={() => {
							this.props.navigation.navigate('WriteFeedback',
								{ academy_id: this.state.academy_id, player_id: this.state.player_id })
						}}>

						<View

							style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'center' }}>

							<Text
								style={styles.filled_button}
							>
								Give Feedback
                            </Text>

						</View>
					</TouchableOpacity>

				</View>



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

const mapStateToProps = state => {
	return {
		data: state.ProfileReducer,
	};
};
const mapDispatchToProps = {
	getRelationsDetails
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachMenuDrawer);


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
		width: '100%',
		padding: 10,
		borderRadius: 22,
		marginLeft: 4,
		marginRight: 4,
		marginTop: 8,
		backgroundColor: '#67BAF5',
		color: 'white',
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium',
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


