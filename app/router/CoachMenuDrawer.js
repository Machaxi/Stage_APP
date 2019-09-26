import React from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Image,
	Text,
	Platform
} from 'react-native';
import { isSignedIn, getData } from "../components/auth";
import { GUEST, PLAYER, COACH, ACADEMY, PARENT } from "../components/Constants";

import { onSignOut, clearData } from "../components/auth";
import firebase from 'react-native-firebase';
import BaseComponent, { defaultStyle, EVENT_EDIT_PROFILE, formattedName } from '../containers/BaseComponent'
import { getRelationsDetails, logout } from "../redux/reducers/ProfileReducer";
import { connect } from 'react-redux';
import Events from '../router/events';
import { Rating } from 'react-native-ratings';
import { RateViewBorder } from '../components/Home/RateViewBorder';
import { SkyFilledButton } from '../components/Home/SkyFilledButton';
import Share from 'react-native-share';

let placeholder_img = "https://databytenitt.github.io/img/male.png"

var notchMargin = Platform.OS === 'ios' ? 20 : 0;

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
			related_guardians: [],
			profile_pic: ''
		};

		isSignedIn()
			.then(res => {
				console.log(res);
				this.setState({ signedIn: res, })

			})
			.catch(err => alert("An error occurred"));

		this.updateData()

		this.refreshEvent = Events.subscribe(EVENT_EDIT_PROFILE, () => {
			//console.warn(EVENT_EDIT_PROFILE)
			this.updateData()
		});
	}

	updateData() {
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
				profile_pic: userData.user['profile_pic']

			})

			let userType = userData.user['user_type']
			if (userType == PLAYER ||
				userType == PARENT) {

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
					//console.warn("related ", JSON.stringify(this.state.related_players))
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

				<View
					style={{
						paddingLeft: 10, paddingRight: 10, paddingTop: 16,
						paddingBottom: 16,
						flexDirection: 'row', backgroundColor: 'white', marginBottom: 12
					}}
				>
					<Image
						resizeMode="contain"
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
								resizeMode="contain"
								style={styles.drawer_logo}
								source={require('../images/dribble_logo.png')}
							/>

							{/* <Image
										style={{
											height: 30, width: 30,
										}}
										source={require('../images/ic_close.png')}
									/> */}
						</View>

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


					</View>
				</View>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							About Machaxi
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
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
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						>

						</Image>

					</View>
				</TouchableOpacity>

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


			</View>)
	}

	geLoggedInGuestMenu() {

		let signedIn = this.state.signedIn
		let user_type = this.state.user_type
		let fullame = this.state.fullName
		let mobileNumber = this.state.mobileNumber
		let menu;
		let ratings = 5
		//user_type = COACH
		//signedIn = true
		let profile_pic = this.state.profile_pic
		if (profile_pic == '' || profile_pic == null) {
			profile_pic = placeholder_img
		}

		return (
			<View>

				<View
					style={{
						paddingLeft: 10, paddingRight: 10, paddingTop: 16,
						paddingBottom: 16,
						flexDirection: 'row', backgroundColor: 'white', marginBottom: 12
					}}
				>
					<Image
						resizeMode="contain"
						style={{ width: 128, height: 128, borderRadius: 8 }}
						source={{ uri: profile_pic }}
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
								resizeMode="contain"
								style={styles.drawer_logo}
								source={require('../images/dribble_logo.png')}
							/>

							{/* <Image
										style={{
											height: 30, width: 30,
										}}
										source={require('../images/ic_close.png')}
									/> */}
						</View>

						<View>

							<Text
								style={{
									color: 'black',
									fontFamily: 'Quicksand-Medium',
									fontSize: 14, marginTop: 16,
								}}>
								{fullame == null ? '-' : fullame}</Text>

							{/* <Text
								style={{
									fontFamily: 'Quicksand-Medium',
									fontSize: 14, marginTop: 8,
								}}>
								{mobileNumber}</Text> */}
							<View style={{ marginTop: 8 }}>
								<TouchableOpacity activeOpacity={.8} onPress={() => {
									this.props.navigation.navigate('EditProfile')
								}}>

									<View style={{
										flex: 1,
										justifyContent: 'space-between',
										flexDirection: 'row',
									}}>

										<Text
											style={{
												color: '#A3A5AE',
												fontFamily: 'Quicksand-Medium',
												fontSize: 14,
											}}>
											{mobileNumber}
										</Text>
										<Text
											style={[defaultStyle.regular_text_14, {
												color: '#667DDB',
												marginLeft: 8
											}]}
										>
											Edit
								</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>


					</View>
				</View>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							About Machaxi
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
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
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						>

						</Image>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => {

					this.callApi()

				}
				}>
					<View style={styles.drawercell}>
						<Text style={styles.menu}>
							Sign Out
								</Text>

					</View>
				</TouchableOpacity>


			</View>)
	}

	callApi() {
		getData('header', (value) => {

			onSignOut()
			clearData()
			global.USER_TYPE = ''
			global.SELECTED_PLAYER_ID = ''


			firebase.auth().signOut();
			this.props.navigation.navigate('Login')


			this.props.logout(value).then(() => {
				let data = this.props.data.profileData
				console.log('logout payload ' + JSON.stringify(this.props.data.profileData));

			}).catch((response) => {
				console.log(response);
			})
		});
	}



	getCoachMenu() {

		let signedIn = this.state.signedIn
		let user_type = this.state.user_type
		let fullame = this.state.fullName
		let mobileNumber = this.state.mobileNumber
		let menu;
		let ratings = global.rating == undefined ? 0 : global.rating
		//user_type = COACH
		//signedIn = true
		let profile_pic = this.state.profile_pic
		if (profile_pic == '' || profile_pic == null) {
			profile_pic = placeholder_img
		}
		//console.warn('profile_pic', profile_pic)


		if (!signedIn) {
			menu = this.getWithoutLoggedMenu()
			fullName = "Guest"
			mobileNumber = "-"
		}

		return (
			<View>

				<View
					style={{
						paddingLeft: 10, paddingRight: 10, paddingTop: 16,
						paddingBottom: 16,
						flexDirection: 'row', backgroundColor: 'white', marginBottom: 12
					}}
				>
					<Image
						style={{ width: 128, height: 128, borderRadius: 8 }}
						source={{ uri: profile_pic }}
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
								resizeMode="contain"
								style={styles.drawer_logo}
								source={require('../images/dribble_logo.png')}
							/>

							{/* <Image
										style={{
											height: 30, width: 30,
										}}
										source={require('../images/ic_close.png')}
									/> */}
						</View>


						<View>

							<Text
								style={{
									color: 'black',
									fontFamily: 'Quicksand-Medium',
									fontSize: 14,
									marginTop: 16
								}}>
								{fullame}</Text>

							<View style={{ marginTop: 8 }}>
								<TouchableOpacity activeOpacity={.8} onPress={() => {
									this.props.navigation.navigate('EditProfile')
								}}>

									<View style={{
										flex: 1,
										justifyContent: 'space-between',
										flexDirection: 'row',
									}}>

										<Text
											style={{
												color: '#A3A5AE',
												fontFamily: 'Quicksand-Medium',
												fontSize: 14,
											}}>
											{mobileNumber}
										</Text>
										<Text
											style={[defaultStyle.regular_text_14, {
												color: '#667DDB',
												marginLeft: 8
											}]}
										>
											Edit
								</Text>
									</View>
								</TouchableOpacity>
							</View>

							<View style={{
								paddingTop: 8,
								alignItems: 'center',
								flexDirection: 'row',
								flex: 1
							}}>

								<Rating
									type='custom'
									ratingColor='#F4FC9A'
									ratingBackgroundColor='#D7D7D7'
									ratingCount={5}
									imageSize={12}
									readonly={true}
									startingValue={ratings}
									style={{ width: 80 }}
								/>

								{/* <Text style={{
									borderColor: '#DFDFDF',
									height: 19, width: 30, textAlign: 'center',
									fontSize: 12,
									borderWidth: 1,
									color: '#707070',
									paddingTop: 0,
									borderRadius: 12,
									fontFamily: 'Quicksand-Medium'
								}}>{ratings}</Text> */}
								<RateViewBorder>
									{ratings}</RateViewBorder>

							</View>
						</View>



					</View>

				</View>



				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('AcademyFeedbackListing')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu_coach}>
							View Academy feedback
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('AcademyListing')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu_coach}>
							Browse Academies
								</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => {
					this.props.navigation.navigate('AcademyListing', {
						vacancy: true
					})
				}}>
					<View style={styles.drawercell}>
						<Text style={styles.menu_coach}>Find Vacancies</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('CoachMyFeedbackListing')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu_coach}>View my Feedback</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('CoachRewardPoints')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu_coach}>Reward Points</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu_coach}>Challenge leaderboard</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ChallengeDisputeScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu_coach}>Challenge Disputes</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>
					</View>
				</TouchableOpacity>

				<View style={[defaultStyle.line_style, { marginLeft: 12 }]} ></View>

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('WebViewScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu_coach}>About Machaxi</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('WebViewScreen')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu_coach}>Contact Us</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => {
					// onSignOut()
					// clearData()
					// firebase.auth().signOut();
					// this.props.navigation.navigate('Login')
					this.callApi()
				}
				}>
					<View style={styles.drawercell}>
						<Text style={styles.menu_coach}>
							Sign Out
								</Text>

					</View>
				</TouchableOpacity>
			</View >)
	}

	parentCell = (obj, show_edit) => {
		return <View style={{
			flexDirection: 'row',
			flex: 1,
			marginTop: 8,
			alignItems: 'center',
			justifyContent: 'space-between'
		}}>
			<Text
				numberOfLines={1}
				style={[defaultStyle.bold_text_14, { width: 90 }]}>{formattedName(obj.name)}</Text>
			<Text style={defaultStyle.regular_text_12}>{obj.phone_number}</Text>

			{show_edit ?
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('EditOtherProfile', { data: JSON.stringify(obj) })
					}}
				>
					<Text style={defaultStyle.regular_text_blue_10}>Edit</Text>
				</TouchableOpacity>
				: null}

		</View>
	}

	getPlayerMenu() {

		let signedIn = this.state.signedIn
		let user_type = this.state.user_type
		let fullame = this.state.fullName
		let mobileNumber = this.state.mobileNumber
		let menu;
		let ratings = 5
		let academy_rating = this.state.academy_rating == undefined ? 0 : this.state.academy_rating
		//user_type = COACH
		//signedIn = true
		let is_parent = user_type == PARENT
		let profile_pic = this.state.profile_pic
		if (profile_pic == '') {
			profile_pic = 'https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg'
		}
		//console.warn('profile_pic', profile_pic)

		let show_edit = is_parent

		if (!signedIn) {
			menu = this.getWithoutLoggedMenu()
			fullName = "Guest"
			mobileNumber = "-"
		}

		let related_players = this.state.related_players
		let size = related_players.length
		let related_players_array = []
		for (let i = 0; i < size; i++) {
			let obj = related_players[i]
			related_players_array.push(
				this.parentCell(obj, show_edit)
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

				<View
					style={{
						paddingLeft: 10, paddingRight: 10, paddingTop: 16,
						paddingBottom: 16,
						flexDirection: 'row', backgroundColor: 'white', marginBottom: 12
					}}
				>
					<Image
						style={{ width: 128, height: 128, borderRadius: 8 }}
						source={{ uri: profile_pic }}
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
								resizeMode="contain"
								style={styles.drawer_logo}
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
											resizeMode="contain"
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




				{this.state.related_guardians.length != 0
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



				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('DietPlan')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Diet Plan
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						>

						</Image>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('PaymentDetail')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Payment
								</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>

				{is_parent ?
					<TouchableOpacity activeOpacity={0.8} onPress={() =>
						this.props.navigation.navigate('ParentRewards')}>

						<View style={styles.drawercell}>

							<Text style={styles.menu}>
								Reward Points
									</Text>

							<Image
								style={styles.arrow_img}
								source={require('../images/ic_drawer_arrow.png')}
							/>

						</View>
					</TouchableOpacity> : null}


				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('AcademyListing')
				}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Browse Academies
								</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>

				{/* <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ReturnPolicyScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							View Coach feedback
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity> */}


				<View style={{
					paddingLeft: 16,
					paddingRight: 16,
					paddingTop: 12,
					paddingBottom: 4,
				}}>



					{/* <Text style={defaultStyle.regular_text_10}>
						Academy Feedback
					</Text> */}

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
							style={[defaultStyle.bold_text_14, { width: 200 }]}>{this.state.academy_name}</Text>

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
							}]}>{academy_rating.toFixed(1)}</Text>

						</View>
					</View>

					<View
						style={{
							marginTop: 12,
						}}
					>

						<SkyFilledButton
							onPress={() => {
								this.props.navigation.navigate('WriteFeedback',
									{ academy_id: this.state.academy_id, player_id: this.state.player_id })
							}}

						>Academy-Coach Feedback</SkyFilledButton>
					</View>

					{/* <TouchableOpacity
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
					</TouchableOpacity> */}

				</View>



				<TouchableOpacity activeOpacity={0.8} onPress={() => {
					this.shareApp()
				}}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Share App
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>

				<View style={[defaultStyle.line_style, { marginLeft: 12 }]}></View>

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('WebViewScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							About Machaxi
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('WebViewScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Contact Us
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('WebViewScreen')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							FAQ
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => {
					// onSignOut()
					// clearData()
					// firebase.auth().signOut();
					// this.props.navigation.navigate('Login')
					this.callApi()
				}
				}>


					<View style={styles.drawercell}>
						<Text style={styles.menu}>
							Sign Out
								 </Text>

					</View>
				</TouchableOpacity>

			</View>)
	}

	shareApp() {
		this.props.navigation.closeDrawer();
		setTimeout(() => {
			const url = 'https://play.google.com/store/apps/'
			const shareOptions = {
				title: 'Share via',
				message: 'I\'m using Machaxi app.',
				url: url,
				//social: Share.Social.WHATSAPP,
				//whatsAppNumber: "9199999999"  // country code + phone number(currently only works on Android)
			};
			Share.open(shareOptions).catch(err => console.log(err))

		}, 1000)


	}

	render() {

		let signedIn = this.state.signedIn
		let user_type = this.state.user_type
		let fullame = this.state.fullName
		let mobileNumber = this.state.mobileNumber
		let menu;
		//user_type = COACH
		//signedIn = true
		let profile_pic = this.state.profile_pic
		if (profile_pic == '' || profile_pic == null) {
			profile_pic = placeholder_img
		}
		//console.warn('profile_pic', profile_pic)

		console.log('signedIn => ', signedIn)
		if (!signedIn) {
			menu = this.getWithoutLoggedMenu()
			//fullName = "Guest"
			//mobileNumber = "-"
		}


		else if (user_type != null) {

			if (user_type == GUEST) {
				menu = this.geLoggedInGuestMenu()

			} else if (user_type == PLAYER) {

				menu = this.getPlayerMenu()

			} else if (user_type == COACH || user_type == ACADEMY) {
				menu = this.getCoachMenu()
			}
			else if (user_type == PARENT) {

				menu = this.getPlayerMenu()
			}
		}



		//marginTop:Platform.OS === "ios" ? 24 :0
		return (
			<ScrollView style={styles.container}>

				<View style={styles.container}>

					<View
						style={{
							marginTop: Platform.OS === "ios" ? 24 : 0
						}}
					>


						<View
							style={{
								paddingLeft: 0, paddingRight: 10,
								paddingBottom: 16
							}}
						>

							{menu}






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
	getRelationsDetails, logout
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachMenuDrawer);


const styles = StyleSheet.create({

	menu_coach: {
		color: '#404040',
		alignItems: 'flex-start',
		fontSize: 14,
		fontFamily: 'Quicksand-Regular',
	},
	drawer_logo: {
		height: 30,
		width: 100,
	},
	menu: {
		color: '#404040',
		alignItems: 'flex-start',
		fontSize: 14,
		fontFamily: 'Quicksand-Medium',
	},
	arrow_img: {
		height: 12,
		width: 5,
		resizeMode: 'contain'
	},
	filled_button: {
		width: '100%',
		paddingLeft: 14,
		paddingRight: 14,
		paddingTop: 10,
		paddingBottom: 10,
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


