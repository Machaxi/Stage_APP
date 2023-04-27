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
import LinearGradient from 'react-native-linear-gradient';
import { onSignOut, clearData } from "../components/auth";
import BaseComponent, { defaultStyle, camelCase, EVENT_EDIT_PROFILE, PROFILE_PIC_UPDATED, RATING_UPDATE, formattedName } from '../containers/BaseComponent'
import { getRelationsDetails, logout } from "../redux/reducers/RelationReducer";
import { connect } from 'react-redux';
import Events from '../router/events';
import { Rating } from 'react-native-ratings';
import { RateViewBorder } from '../components/Home/RateViewBorder';
import { SkyFilledButton } from '../components/Home/SkyFilledButton';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image'
import StarRating from 'react-native-star-rating';
import DeviceInfo from 'react-native-device-info';
import { greyVariant12, white } from '../containers/util/colors';
import { Nunito_Regular } from '../containers/util/fonts';
import { SubPointsAboutMachaxi } from '../components/molecules/aboutMachaxiSubpoints';
import { DrawerCloseBtn } from '../components/molecules/drawerCloseBtn';
import { DrawerItemBtn } from '../components/molecules/drawerItemBtn';
import { ColourfulDrawerItem } from '../components/molecules/colourfulDrawerItem';
import { PlayerDetailsAndEdit } from '../components/molecules/playerDetailsAndEdit';

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
			profile_pic: '',
			updated_profile_pic: '',
			staticDataVisibility: false,
			playDataVisibility:false,
			isLearnPlanEnabled: false,
			isPlayPlanEnabled: false,
			learnDataVisibility: false
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

		this.refreshEvent = Events.subscribe(RATING_UPDATE, (obj) => {

			if (obj) {
				this.setState({
					academy_rating: obj.academy_rating,
					academy_name: obj.academy_name
				})
				//alert(obj.academy_rating)
			}


		});

		this.refreshEvent = Events.subscribe(PROFILE_PIC_UPDATED, (obj) => {

			console.log('PROFILE_PIC_UPDATED', PROFILE_PIC_UPDATED);

			if (obj) {
				this.setState({
					updated_profile_pic: obj,
				})
				//alert(obj)
			}
		});


	}
	
	updateData() {
		getData('userInfo', (value) => {
			userData = (JSON.parse(value));
		
			const updated_profile_pic = this.state.updated_profile_pic

			if (!userData.user_id) {
				userData['user_id'] = ''
			}

			this.setState({
				isLearnPlanEnabled: userData?.is_learn_enabled,
				isPlayPlanEnabled: userData?.is_play_enabled,
				user_type: userData.user['user_type'],
				fullName: userData.user['name'],
				mobileNumber: userData.user['mobile_number'],
				player_id: userData.player_id,
				academy_id: userData.academy_id,
				academy_rating: userData.academy_rating,
				academy_name: userData.academy_name,
				profile_pic: updated_profile_pic != '' ? updated_profile_pic : userData.user['profile_pic'],
				user_id: userData.user_id
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

							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate('Login')
								}}
							>

								<Text
									style={{
										color: '#667DDB',
										fontFamily: 'Quicksand-Medium',
										fontSize: 14, marginTop: 8,
									}}>
									Sign In</Text></TouchableOpacity>

						</View>


					</View>
				</View>

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('WebViewScreen')}>

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

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('ContactUs')}>

					<View style={styles.drawercell}>

						<Text style={styles.menu}>
							Contact Us
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}>

						</Image>

					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => {
					this.props.navigation.navigate('Login')
				}}>

					<View style={styles.drawercell}>
						<Text style={styles.menu}>
							Sign In
								</Text>


					</View>
				</TouchableOpacity>

				<Text
					style={styles.version_style}>
					App Version: {DeviceInfo.getVersion()}</Text>

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
        {/* <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 16,
            paddingBottom: 16,
            flexDirection: "row",
            backgroundColor: "white",
            marginBottom: 12,
          }}
        > */}
			<View
					style={{
						paddingLeft: 10, paddingTop: 16,
						paddingBottom: 16,
						flexDirection: 'row', backgroundColor: '#262051', marginBottom: 12
					}}
				>
					{/* <Image
						style={{ width: 128, height: 128, borderRadius: 8 }}
						source={{ uri: profile_pic }}
					></Image> */}
				{profile_pic?
					<FastImage
						//resizeMode={FastImage.resizeMode.contain}
						style={{
							width: 93, height: 98,
						}}
						source={{ uri: profile_pic }}
					/>
					:
					<Image
					style={{ width: 93, height: 100, resizeMode:'cover'  }}
					source={require('../images/dummy_user.jpg')}
					></Image>
					}

					<View
						style={{
							justifyContent: 'center',
							marginLeft: 10,

						}}
					>
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
								<View style={{flexDirection:'row', alignItems:'center'}}>
								<Text
									style={{
										color: '#A3A5AE',
										fontFamily: 'Quicksand-Medium',
										fontSize: 14,
										marginTop: 8
									}}>
									Guest</Text>
								<TouchableOpacity style={{paddingLeft:8}} activeOpacity={.8} onPress={() => {
									this.props.navigation.navigate('EditProfile', { relations: this.state.related_players })
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
												fontFamily: Nunito_Regular,
												fontSize: 10, 
												fontWeight:'400',
												marginLeft: 4
											}}
										>
											Edit
								</Text>
									</View>
								</TouchableOpacity></View>
								
								
								
								<Text
									style={{
										color: '#FFFFFF',
										fontFamily: 'Quicksand-Medium',
										fontSize: 20,
										marginTop: 8
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
								<Text
									style={{
										color: '#7B7C83',
										fontFamily: 'Quicksand-Medium',
										fontSize: 12,
										marginTop: 4
									}}>
									({user_type == PARENT ? 'Guardian' : camelCase(user_type)})</Text>
							</View>
						}
					</View>
				</View>
				{/* new guest drawer top end */}

        <TouchableOpacity
          activeOpacity={0.8}
		  //TODO:
          //onPress={() => this.props.navigation.navigate("WebViewScreen")}
        >
          <View style={styles.drawercell}>
            <Text style={styles.menu}>About Machaxi</Text>

            <Image
              style={styles.arrow_img}
              source={require("../images/ic_drawer_arrow.png")}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>{ 
			//TODO:
			//this.props.navigation.navigate("ContactUs")
		}}
        >
          <View style={styles.drawercell}>
            <Text style={styles.menu}>Contact Us</Text>

            <Image
              style={styles.arrow_img}
              source={require("../images/ic_drawer_arrow.png")}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.callApi();
          }}
        >
          <View style={styles.drawercell}>
            <Text style={styles.menu}>Sign Out</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.version_style}>
          App Version: {DeviceInfo.getVersion()}
        </Text>
      </View>
    );
	}

	callApi() {
		getData('header', (value) => {

			this.logout(this.props.navigation)

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

		let user_type_str = user_type
		if (user_type == COACH)
			user_type_str = 'Coach'
		else if (user_type == ACADEMY)
			user_type_str = 'Academy'


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
						</View>
						<View>
							<Text
								style={{
									color: 'black',
									fontFamily: 'Quicksand-Medium',
									fontSize: 14,
									marginTop: 8
								}}>
								{fullame}</Text>

							<Text
								style={{
									color: 'black',
									fontFamily: 'Quicksand-Medium',
									fontSize: 10,
									marginTop: 4
								}}>
								({user_type_str})</Text>

							<View style={{ marginTop: 8 }}>
								<TouchableOpacity activeOpacity={.8} onPress={() => {
									this.props.navigation.navigate('EditProfile', { relations: [] })
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

								{/* <Rating
									type='custom'
									ratingColor='#F4FC9A'
									ratingBackgroundColor='#D7D7D7'
									ratingCount={5}
									imageSize={12}
									readonly={true}
									startingValue={ratings}
									style={{ width: 80 }}
								/> */}
								<StarRating
									style={{
										//height: 24, 
										width: 70,
										marginRight: 6,
									}}
									containerStyle={{
										width: 70,
										marginRight: 6
									}}
									starSize={14}
									disabled={true}
									emptyStar={require('../images/ic_empty_star.png')}
									fullStar={require('../images/ic_star.png')}
									halfStar={require('../images/ic_half_star.png')}
									iconSet={'Ionicons'}
									maxStars={5}
									rating={ratings}
									ratingBackgroundColor={"#ff2200"}
									fullStarColor={'#F4FC9A'}
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
							View Society Feedback
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>

				{user_type == COACH &&
					<TouchableOpacity activeOpacity={0.8} onPress={() =>
						this.props.navigation.navigate('AcademyListing')}>

						<View style={styles.drawercell}>

							<Text style={styles.menu_coach}>
								Coaching Plans
								</Text>

							<Image
								style={styles.arrow_img}
								source={require('../images/ic_drawer_arrow.png')}
							/>
						</View>
					</TouchableOpacity>
				}

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

				{user_type == COACH ?
					<TouchableOpacity activeOpacity={0.8} onPress={() =>
						this.props.navigation.navigate('CoachMyFeedbackListing')}>
						<View style={styles.drawercell}>
							<Text style={styles.menu_coach}>View my Feedback</Text>
							<Image
								style={styles.arrow_img}
								source={require('../images/ic_drawer_arrow.png')}
							/>
						</View>
					</TouchableOpacity> : null
				}
				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('CoachRewardPoints')}>
					<View style={styles.drawercell}>
						<Text style={styles.menu_coach}>Reward Points</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('LeaderboardRoute')}>
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

				{
					this.state.user_type == ACADEMY &&
					<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('DuePaymentsScreen')}>
						<View style={styles.drawercell}>
							<Text style={styles.menu_coach}>Payment Dues</Text>
							<Image
								style={styles.arrow_img}
								source={require('../images/ic_drawer_arrow.png')}
							/>
						</View>
					</TouchableOpacity>
				}

				{
					this.state.user_type == ACADEMY &&
					<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('PaymentReport')}>
						<View style={styles.drawercell}>
							<Text style={styles.menu_coach}>Payment Report</Text>
							<Image
								style={styles.arrow_img}
								source={require('../images/ic_drawer_arrow.png')}
							/>
						</View>
					</TouchableOpacity>
				}



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

				<TouchableOpacity activeOpacity={0.8} onPress={() =>{
					this.props.navigation.navigate('ContactUs')}}>
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

				<Text
					style={styles.version_style}>
					App Version: {DeviceInfo.getVersion()}</Text>
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
				style={[defaultStyle.bold_text_14, { width: 90 ,color:'#CECECE'}]}>{formattedName(obj.name)}</Text>
			<Text style={[defaultStyle.regular_text_12, { color:'#CECECE'}]}>{obj.phone_number}</Text>

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

		console.warn('profile_pic', profile_pic)

		let show_edit = is_parent

		if (!signedIn) {
			menu = this.getWithoutLoggedMenu()
			fullame = "Guest"
			mobileNumber = "-"
		}

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
		console.log('drawer  getPlayerMenu function');
		return (
			<View >
				
				<View
					style={{
						paddingLeft: 10, paddingTop: 16,
						paddingBottom: 16,
						flexDirection: 'row', backgroundColor: '#262051', marginBottom: 12
					}}
				>
					{/* <Image
						style={{ width: 128, height: 128, borderRadius: 8 }}
						source={{ uri: profile_pic }}
					></Image> */}
				{profile_pic?
					<FastImage
						//resizeMode={FastImage.resizeMode.contain}
						style={{
							width: 93, height: 98,
						}}
						source={{ uri: profile_pic }}
					/>
					:
					<Image
					style={{ width: 93, height: 100, resizeMode:'cover'  }}
					source={require('../images/dummy_user.jpg')}
					></Image>
					}

					<View
						style={{
							justifyContent: 'center',
							marginLeft: 10,

						}}
					>
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
								<View style={{flexDirection:'row'}}>
								<Text
									style={{
										color: '#A3A5AE',
										fontFamily: 'Quicksand-Medium',
										fontSize: 14,
										marginTop: 8
									}}>
									Player</Text>
								<TouchableOpacity style={{paddingLeft:8}} activeOpacity={.8} onPress={() => {
									this.props.navigation.navigate('EditProfile', { relations: this.state.related_players })
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
												fontFamily: Nunito_Regular,
												fontSize: 10, 
												fontWeight:'400',
												marginLeft: 4
											}}
										>
											Edit
								</Text>
									</View>
								</TouchableOpacity></View>
								
								
								
								<Text
									style={{
										color: '#FFFFFF',
										fontFamily: 'Quicksand-Medium',
										fontSize: 20,
										marginTop: 8
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
								<Text
									style={{
										color: '#7B7C83',
										fontFamily: 'Quicksand-Medium',
										fontSize: 12,
										marginTop: 4
									}}>
									({user_type == PARENT ? 'Guardian' : camelCase(user_type)})</Text>
							</View>
						}
					</View>
				</View>
				{/* start */}
					{
					!this.state.isLearnPlanEnabled && 
					<ColourfulDrawerItem onPress={()=> {
						this.setState({
							learnDataVisibility: !this.state.learnDataVisibility,
						})
						}}
						image={require('../images/play.png')}
						title={'Learn'}
						isExpanded={this.state.learnDataVisibility}
					/>
				}
				{this.state.related_guardians.length != 0 && this.state.learnDataVisibility
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


				{this.state.related_players.length != 0 && this.state.learnDataVisibility
					?
					<View style={{
						paddingLeft: 44,
						paddingRight: 16,
						paddingTop: 12,
						paddingBottom: 12,
					}}>
						<View style={{flexDirection:'row'  }}>
						<Text style={{fontSize: 10,color: "#A3A5AE",fontFamily: "Quicksand-Regular"}}>
							Players details
						</Text>
						<PlayerDetailsAndEdit onPress={() => {
							this.props.navigation.navigate('EditProfile', { relations: this.state.related_players })
						}} />
						</View>
						{related_players_array}
					</View>
					: null}
				{this.state.learnDataVisibility && <View style={[defaultStyle.line_style, styles.greyLine, {marginLeft: 12}]}></View>}
				{this.state.learnDataVisibility && <TouchableOpacity style={{
						paddingLeft: 28,
						paddingBottom: 12,
					}} activeOpacity={0.8} onPress={() =>{
					//TODO:
					//this.props.navigation.navigate("BatchDetails");
					}
				}>
				<View style={styles.drawercell}>
						<Text style={styles.menuTxt}>
							Batch details
						</Text>
						<Image
							style={styles.arrow_img}
							source={require('../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>
				}
				 <View style={[defaultStyle.line_style, styles.greyLine, {marginLeft: 0}]}></View>
				{/* learn section end */}
				{
					!this.state.isPlayPlanEnabled && 
					<ColourfulDrawerItem onPress={()=> {
						this.setState({
							playDataVisibility: !this.state.playDataVisibility,
						})
						}}
						image={require('../images/play.png')}
						title={'Play'}
						isExpanded={this.state.playDataVisibility}
					/>
				}
				{this.state.related_guardians.length != 0 && this.state.playDataVisibility
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


				{this.state.related_players.length != 0 && this.state.playDataVisibility
					?
					<View style={{
						paddingLeft: 44,
						paddingRight: 16,
						paddingTop: 12,
						paddingBottom: 12,
					}}>
						<View style={{flexDirection:'row'  }}>
							<Text style={{fontSize: 10,color: "#A3A5AE",fontFamily: "Quicksand-Regular"}}>
								Players details
							</Text>
							<PlayerDetailsAndEdit onPress={() => {
								this.props.navigation.navigate('EditProfile', { relations: this.state.related_players })
							}} />
						</View>
						{related_players_array}
					</View>
					: null}
				{this.state.playDataVisibility?
				<View style={{paddingLeft: 28}}>
				{this.state.playDataVisibility && <View style={{height: 1, marginTop: 8, marginBottom: 8, backgroundColor:'#272733', }}></View>}

				<TouchableOpacity activeOpacity={0.8} onPress={() =>
					this.props.navigation.navigate('AcademyListing')
				}>
				<View style={styles.drawercell}>

					<Text style={styles.menuTxt}>
						Book Slot
							</Text>

					<Image
						style={styles.arrow_img}
						source={require('../images/ic_drawer_arrow.png')}
					/>

				</View>
			</TouchableOpacity>

			<TouchableOpacity activeOpacity={0.8} onPress={() =>
				// this.props.navigation.navigate('AcademyListing')
				this.props.navigation.navigate('MyBookingsScreen')
			}>

				<View style={styles.drawercell}>
					<Text style={styles.menuTxt}>
						My Booking
					</Text>
					<Image
						style={styles.arrow_img}
						source={require('../images/ic_drawer_arrow.png')}
					/>
				</View>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.8} onPress={() =>
				//this.props.navigation.navigate('AcademyListing')
				this.props.navigation.navigate('MyRequestsHome')
			}>

				<View style={styles.drawercell}>

					<Text style={styles.menuTxt}>
						My Requests
							</Text>

					<Image
						style={styles.arrow_img}
						source={require('../images/ic_drawer_arrow.png')}
					/>

				</View>
				</TouchableOpacity>
				</View>
				:null}
				<View style={{
					paddingLeft: 16,
					paddingRight: 16,
					paddingTop: 12,
					paddingBottom: 4,
				}}>
				</View>

				<View style={[defaultStyle.line_style, styles.greyLine]}></View>
				{!this.state.isPlayPlanEnabled && <DrawerItemBtn itemImage={require('../images/wallet.png')} onPress={()=>{
					this.props.navigation.navigate('PaymentDetail');
					}}
					title={'Payment'}
				/>}
				<View style={[defaultStyle.line_style, styles.greyLine]}></View>
				<DrawerItemBtn itemImage={require('../images/share_icon.png')} onPress={()=>{
					this.shareApp();
					}}
					title={'Share App'}
				/>
				<View style={[defaultStyle.line_style,  styles.greyLine]}></View>
				<ColourfulDrawerItem
					onPress={()=> {
						// this.setState({
						// 	staticDataVisibility: !this.state.staticDataVisibility,
						// });
						}
					}
					image={require('../images/info.png')}
					title={'About Machaxi'}
					isExpanded={this.state.staticDataVisibility}
				/>
				
			{this.state.staticDataVisibility?(<>
				<SubPointsAboutMachaxi title={'About us'} onPress={()=>{
					this.props.navigation.navigate("WebViewScreen");
				}} />
				<SubPointsAboutMachaxi title={'Careers Page'} onPress={()=>{
					this.props.navigation.navigate("ContactUs");
				}} />
				<SubPointsAboutMachaxi title={'Privacy Policy'} onPress={()=>{
					this.props.navigation.navigate("ContactUs");
				}} />
				<SubPointsAboutMachaxi title={'Blog'} onPress={()=>{
					this.props.navigation.navigate("ContactUs");
				}} />
				<SubPointsAboutMachaxi title={'FAQ'} onPress={()=>{
					this.props.navigation.navigate("FaqScreen");
				}} />
			
				</>):null}
				<View style={[defaultStyle.line_style, { marginLeft: 12 , backgroundColor:'#272733', marginRight: 12}]}></View>
				
				<TouchableOpacity activeOpacity={0.8} onPress={() => {
					this.callApi()
				}
				}>
					<View style={styles.signOut}>
						<Image
							style={styles.sign_out}
							source={require('../images/sign_out.png')}
						/>
						<Text style={styles.seperateFunction}>
							Sign Out
								 </Text>

					</View>
				</TouchableOpacity>

			</View>)
		
	}

	shareApp() {
		this.props.navigation.closeDrawer();
		setTimeout(() => {
			let url = 'https://machaxi.app.link/get-machaxi'

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
		console.log('uuuuuu'+user_type)
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

		//console.log('signedIn => ', signedIn)
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
				 <LinearGradient
				  colors={['#051732', '#232031']}
				//   style={{flex:1}}
				  start={{ x: 0, y: 0 }}
				  end={{ x: 1, y: 1 }}
				 >
				<View style={styles.container}>
					<DrawerCloseBtn onPress={()=>{
						this.props.navigation.closeDrawer();
					}} />
					<View
						style={{
							marginTop: Platform.OS === "ios" ? 24 : 0
						}}
					>
						<View
							style={{
								paddingLeft: 0,
								paddingBottom: 16
							}}
						>
							{menu}
						</View>
					</View>

				</View></LinearGradient>
			</ScrollView>

		)
	}
}

const mapStateToProps = state => {
	return {
		data: state.RelationReducer,
	};
};
const mapDispatchToProps = {
	getRelationsDetails, logout
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachMenuDrawer);


const styles = StyleSheet.create({

	menu_coach: {
		color: white,
		//color: '#404040',
		alignItems: 'flex-start',
		fontSize: 14,
		fontFamily: 'Quicksand-Regular',
	},
	drawer_logo: {
		height: 30,
		width: 100,
	},
	menu: {
		color: '#AFAFAF',
		alignItems: 'flex-start',
		fontSize: 14,
		fontFamily: 'Quicksand-Medium',
	},
	menuTxt: {
		color: greyVariant12,
		fontFamily:Nunito_Regular,
		fontWeight: '400',
		fontSize: 14
	},
	seperateFunction:{
		color: '#AFAFAF',
		fontSize: 16,
		fontFamily: 'Quicksand-Medium',
		marginTop:2,
		textAlign:'center',
	},
	arrow_img: {
		height: 12,
		width: 5,
		resizeMode: 'contain'
	},
	orange_arrow_img: {
		height: 5,
		width: 12,
		resizeMode: 'contain'
	},
	sign_out: {
		height: 28,
		width: 28,
		marginRight:8,
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
	greyLine: {marginLeft: 12 , backgroundColor:'#272733', marginRight: 12},
	drawercell: {
		// backgroundColor:'green',
		//padding: 16,
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 12,
		paddingBottom: 12,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	signOut: {
		//padding: 16,
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 12,
		paddingBottom: 12,
		// alignItems: 'center',
		// textAlign:'center',
		flexDirection: 'row',
		
	},
	version_style: {
		color: white,
		//color: '#404040',
		width: "100%",
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium',
		fontSize: 10,
		marginTop: 16,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 4
	},

	container: {
		flex: 1,
		backgroundColor: '#232031'
	},
})




