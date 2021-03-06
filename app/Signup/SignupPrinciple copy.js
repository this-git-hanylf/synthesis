//import react in project
import React from "react";
import {
  PermissionsAndroid,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  StyleSheet,
  Alert,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title,
  ListItem,
  Textarea,
  Picker,
  // CheckBox
} from "native-base";
import { SearchBar } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the required component
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import { Style, Colors, Metrics } from "../Themes";
import { Actions } from "react-native-router-flux";
import { _storeData, _getData } from "@Component/StoreAsync";
import DeviceInfo from "react-native-device-info";
import { urlApi } from "@Config/services";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";

let isMount = false;
const userType = [
  {
    key: 1,
    label: "Inhouse",
    value: "I",
  },
  {
    key: 2,
    label: "Member",
    value: "M",
  },
];

class SignupPrincipless extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    // this.handleBuy = this.handleBuy.bind(this);

    this.state = {
      checked: false,
      dataProject: [],
      isLoaded: true,

      email: "",
      agencyname: "",
      companyname: "",
      address: "",
      npwp: "",
      bank_name: "",
      acc_name: "",
      acc_no: "",
      getLeadCode: [],

      contactperson: "",
      contactno: "",

      pictUrlKtp: "",
      pictUrlNPWP: "",
      pictUrlSIUP: "",
      pictUrlTDP: "",
      pictUrlDomisili: "",
      pictUrlAktePendirian: "",

      selectedProject: [],

      search: "",
      modalVisible: false,
      _agencyname: "",
      lead_cd: "",
      lead_name: "",
      title: "I have read and accept the terms & conditions",
      files: [],
    };
    // console.log('statte', this.state.title);
  }

  componentDidMount() {
    const data = {
      contactperson: this.props.datas_dari_regist.fullname,
      email: this.props.datas_dari_regist.email,
      contactno: this.props.datas_dari_regist.hp,
      code: this.props.datas_dari_regist.code,
    };
    console.log("email", data.email);
    console.log("data dari regis", data);
    this.setState(data, () => {
      // this.getDataListProspect(this.props.datas)
      this.getLeadCd();
      // this.getProject2();
      this.getFile();
      // this.getDataFollowUp(this.props.datas)
      // this.getStatus()
    });

    isMount = true;
    // this.getPDF()

    // const { email } = this.state.email;
    // console.log("email",email);
    console.log("statte", this.state.title);
  }

  handleCheck() {
    this.setState({ checked: !this.state.checked });
    // Actions.pagePDF();
    // Actions.pagePDF({item : item})
  }

  getFile = () => {
    fetch(urlApi + "c_termcondition/getTermCondition/IFCAMOBILE", {
      method: "GET",
      // headers : this.state.hd,
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;
          this.setState({ files: resData });
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            alert(res.Pesan);
          });
        }
        console.log("getFiles", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  downloadFile(val) {
    // const android = RNFetchBlob.android
    console.log("donload item", val);
    Actions.pagePDF({ item: val });
    this.setState({ click: true });
  }

  // handleBuy(){
  //     Actions.NUPPay({nup : this.props.nup});
  // }

  showAlert = (key) => {
    Alert.alert(
      "Select a Photo",
      "Choose the place where you want to get a photo",
      [
        { text: "Gallery", onPress: () => this.fromGallery(key) },
        { text: "Camera", onPress: () => this.fromCamera(key) },
        {
          text: "Cancel",
          onPress: () => console.log("User Cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  fromCamera(key) {
    ImagePicker.openCamera({
      cropping: true,
      width: 600,
      height: 600,
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path } });
      })
      .catch((e) => console.log("tag", e));
  }

  fromGallery(key) {
    ImagePicker.openPicker({
      multiple: false,
      width: 600,
      height: 600,
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path } });
      })
      .catch((e) => console.log("tag", e));
  }

  getLeadCd = () => {
    // const item = this.props.items
    fetch(urlApi + "c_principal/zoomLeadCode/IFCAPB/", {
      method: "GET",
      // headers : this.state.hd,
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;
          resData.map((data) => {
            this.setState((prevState) => ({
              getLeadCode: [
                ...prevState.getLeadCode,
                { label: data.lead_name, value: data.lead_cd },
              ],
            }));
          });
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            alert(res.Pesan);
          });
        }
        console.log("leadcd", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  validating = (validationData) => {
    const keys = Object.keys(validationData);
    const errorKey = [];
    let isValid = false;

    keys.map((data, key) => {
      if (validationData[data].require) {
        let isError =
          !this.state[data] || this.state[data].length == 0 ? true : false;
        let error = "error" + data;
        errorKey.push(isError);
        this.setState({ [error]: isError });
      }
    });

    for (var i = 0; i < errorKey.length; i++) {
      if (errorKey[i]) {
        isValid = false;
        break;
      }
      isValid = true;
    }

    return isValid;
  };

  submit = () => {
    this.setState({ isLoaded: !this.state.isLoaded });
    // const { email } = this.state.email;
    // console.log("email",email);
    let filektp = RNFetchBlob.wrap(
      this.state.pictUrlKtp.uri.replace("file://", "")
    );
    let filenpwp = RNFetchBlob.wrap(
      this.state.pictUrlNPWP.uri.replace("file://", "")
    );
    let filesiup = RNFetchBlob.wrap(
      this.state.pictUrlSIUP.uri.replace("file://", "")
    );
    let filetdp = RNFetchBlob.wrap(
      this.state.pictUrlTDP.uri.replace("file://", "")
    );
    let filedomisili = RNFetchBlob.wrap(
      this.state.pictUrlDomisili.uri.replace("file://", "")
    );
    let fileakte = RNFetchBlob.wrap(
      this.state.pictUrlAktePendirian.uri.replace("file://", "")
    );
    // const valid_domisili = this.state.pictUrlDomisili.uri;
    // console.log('url domisili',this.state.pictUrlDomisili);

    // if (valid_domisili == 0 && valid_domisili == ''){

    // }

    const {
      email,
      agencyname,
      companyname,
      address,
      npwp,
      bank_name,
      acc_name,
      acc_no,
      contactperson,
      contactno,
      lead_cd,
      lead_name,
      code,
      // lead_name,
      // getLeadCode,
      // pictUrlDomisili
    } = this.state;

    const frmData = {
      // group_type: selectedType,

      email: email,
      agencyname: agencyname,
      companyname: companyname,
      address: address,
      npwp: npwp,
      bank_name: bank_name,
      acc_name: acc_name,
      acc_no: acc_no,

      contactperson: contactperson,
      contactno: contactno,

      pictUrlKtp: filektp,
      pictUrlNPWP: filenpwp,
      pictUrlSIUP: filesiup,
      pictUrlTDP: filetdp,
      pictUrlDomisili: filedomisili,
      pictUrlAktePendirian: fileakte,
      lead_cd: code,
      // lead_cd: lead_cd,
      // lead_name: lead_name[0].label
      // lead_name: getLeadCode[0].lead_name,
    };

    const isValid = this.validating({
      email: { require: true },
      agencyname: { require: true },
      companyname: { require: true },
      address: { require: true },
      npwp: { require: true },
      bank_name: { require: true },
      acc_name: { require: true },
      acc_no: { require: true },
      contactperson: { require: true },
      contactno: { require: true },
      lead_cd: { require: true },
      // filedomisili: { require: true}
      // address: { require: true },
      // selectedType: { require: true },
      // selectedProject: { require: true }
    });
    const _agencyname = agencyname.replace(/\s+/g, "_");

    let fileNameKtp = "KTP_RegisPrincipal_" + _agencyname + ".png";
    let fileNameNpwp = "NWPW_RegisPrincipal_" + _agencyname + ".png";
    let fileNameSIUP = "SIUP_RegisPrincipal_" + _agencyname + ".png";
    let fileNameTDP = "TDP_RegisPrincipal_" + _agencyname + ".png";
    let fileNameDomisili = "Domisili_RegisPrincipal_" + _agencyname + ".png";
    let fileNameAktePendirian = "APPP_RegisPrincipal_" + _agencyname + ".png";

    console.log("saveFormNUP", frmData);

    // let fileName = "KTP_RegisAgent.png";
    // let fileImg = "";

    // console.log('url', fileNameDomisili);

    if (isValid) {
      // console.log('valid domisili', valid_domisili);
      // fileImg = RNFetchBlob.wrap(
      //     this.state.pictUrl.uri.replace("file://", "")
      // );

      RNFetchBlob.fetch(
        "POST",
        urlApi + "c_auth/SignUpPrinciple",
        {
          "Content-Type": "multipart/form-data",
        },
        [
          // { name: "photo", filename: fileName, data: fileImg },
          { name: "photoktp", filename: fileNameKtp, data: filektp },
          { name: "photonpwp", filename: fileNameNpwp, data: filenpwp },
          { name: "photosiup", filename: fileNameSIUP, data: filesiup },
          { name: "phototdp", filename: fileNameTDP, data: filetdp },
          {
            name: "photodomisili",
            filename: fileNameDomisili,
            data: filedomisili,
          },
          {
            name: "photoakte",
            filename: fileNameAktePendirian,
            data: fileakte,
          },
          { name: "data", data: JSON.stringify(frmData) },
        ]
      ).then((resp) => {
        const res = JSON.parse(resp.data);
        // let res = JSON.stringify(resp.data);
        console.log("res", resp);
        if (!res.Error) {
          // Actions.pop()
          this.setState({ isLogin: true }, () => {
            alert(res.Pesan);
            Actions.pop();
          });
        } else {
          this.setState({ isLoaded: !this.state.isLoaded }, () => {
            alert(res.Pesan);
          });
        }
        // alert(res.Pesan);
      });
      // .then((response) => response.json())
    } else {
      alert("Please assign your ID Picture");
    }
  };

  titleCheckbox() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Text>I have read and accept </Text>
          <Text
            onPress={() => alert("terms")}
            style={{ textDecorationLine: "underline" }}
          >
            the terms & conditions
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const item = this.props.items;
    console.log("item apasih", item);
    return (
      <Container>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../Images/background-blue.png")}
        >
          <Header style={styles.header}>
            <Left style={styles.left}>
              <Button
                transparent
                style={Style.actionBarBtn}
                onPress={Actions.pop}
              >
                <Icon
                  active
                  name="arrow-left"
                  style={Style.textWhite}
                  type="MaterialCommunityIcons"
                />
              </Button>
            </Left>
            <Body style={styles.body}>
              <Text style={[Style.textWhite, Style.textMedium]}>
                {"Sign Up as Principal"}
              </Text>
            </Body>
            <Right style={styles.right}></Right>
          </Header>
          <ScrollView
            contentContainerStyle={{ paddingVertical: 10 }}
            scrollEnabled={this.state.isLoaded ? true : false}
          >
            <View
              style={[
                styles.inputFieldStyles,
                { justifyContent: "flex-start" },
              ]}
            >
              <View>
                <View
                  style={styles.containEmail}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Input
                    ref="email"
                    style={styles.inputEmail}
                    editable={this.props.data ? false : true}
                    keyboardType="email-address"
                    onChangeText={(val) => this.setState({ email: val })}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    placeholder="Email"
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    value={this.state.email}
                  />
                  {this.state.erroremail ? (
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 25,
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      ! Email Required
                    </Text>
                  ) : null}
                </View>
                <View
                  style={styles.containMid}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Input
                    ref="agencyname"
                    style={styles.inputEmail}
                    editable={true}
                    onChangeText={(val) => this.setState({ agencyname: val })}
                    returnKeyType="next"
                    autoCapitalize="words"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    placeholder="Agency Name"
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    value={this.state.agencyname}
                  />
                  {this.state.errorfullname ? (
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 25,
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      ! Agency Name Required
                    </Text>
                  ) : null}
                </View>
                <View
                  style={styles.containMid}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Input
                    ref="companyyname"
                    style={styles.inputEmail}
                    editable={true}
                    onChangeText={(val) => this.setState({ companyname: val })}
                    returnKeyType="next"
                    autoCapitalize="words"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    placeholder="Company Name"
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    value={this.state.companyname}
                  />
                  {this.state.errorfullname ? (
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 25,
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      ! Company Name Required
                    </Text>
                  ) : null}
                </View>
                <View
                  style={styles.containMidAddress}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Textarea
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    style={styles.inputAddress}
                    value={this.state.address}
                    onChangeText={(val) => this.setState({ address: val })}
                    maxLength={60}
                    placeholder="Address"
                    editable={true}
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    autoCapitalize="words"
                    returnKeyType="next"
                    ref="address"
                  ></Textarea>
                  {this.state.errorfullname ? (
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 25,
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      ! Address Required
                    </Text>
                  ) : null}
                </View>
                <View
                  style={styles.containMid}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Input
                    ref="npwp"
                    style={styles.inputEmail}
                    editable={true}
                    onChangeText={(val) => this.setState({ npwp: val })}
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="words"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    placeholder="NPWP"
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    value={this.state.npwp}
                  />
                  {this.state.errorfullname ? (
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 25,
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      ! NPWP Required
                    </Text>
                  ) : null}
                </View>
                <View
                  style={styles.containMid}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Input
                    ref="bankname"
                    style={styles.inputEmail}
                    editable={true}
                    onChangeText={(val) => this.setState({ bank_name: val })}
                    returnKeyType="next"
                    autoCapitalize="words"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    placeholder="Bank Name"
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    value={this.state.bank_name}
                  />
                </View>
                <View
                  style={styles.containMid}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Input
                    ref="accname"
                    style={styles.inputEmail}
                    editable={true}
                    onChangeText={(val) => this.setState({ acc_name: val })}
                    returnKeyType="next"
                    autoCapitalize="words"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    placeholder="Account Name"
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    value={this.state.acc_name}
                  />
                </View>
                <View
                  style={styles.containMid}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Input
                    ref="accno"
                    style={styles.inputEmail}
                    editable={true}
                    onChangeText={(val) => this.setState({ acc_no: val })}
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    placeholder="Account No"
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    value={this.state.acc_no}
                  />
                </View>
                {/* <View style={styles.containMid} pointerEvents={this.state.isLoaded ? "auto" : "none"}>
                                    <RNPickerSelect
                                        style={pickerSelectStyles}
                                        items={this.state.getLeadCode}
                                        selectedValue={this.state.lead_cd}
                                        // onValueChange={(val)=>this.setState({lead_cd:val})}
                                        onValueChange={(val)=>{
                                            const leadname = this.state.getLeadCode.filter(item=>item.value==val);
                                            // console.log('lead name', this.state.getLeadCode.filter(item=>item.value==val))
                                            this.setState({lead_cd:val,lead_name:leadname});
                                            // console.log('lead name nih', this.setState({lead_cd:val,lead_name:item}))
                                        }}
                                        placeholder={{
                                            key: 0,
                                            label: "Select Lead Code"
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                    />
                                    {this.state.errorselectedType ? (
                                        <Text
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 25,
                                                color: "red",
                                                fontSize: 12
                                            }}
                                        >
                                            ! Select User Type Required
                                        </Text>
                                    ) : null}
                                </View>  */}

                {/* <View style={styles.containMid} pointerEvents={this.state.isLoaded ? "auto" : "none"}>
                                    <Input
                                        ref="contactperson"
                                        style={styles.inputEmail}
                                        editable={true}
                                        onChangeText={val =>
                                            this.setState({ code: val })
                                        }
                                        returnKeyType="next"
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        textAlign={
                                            I18nManager.isRTL ? "right" : "left"
                                        }
                                        placeholder="Contact Person"
                                        placeholderTextColor="rgba(0,0,0,0.20)"
                                        value={this.state.code}
                                    />
                                    
                                </View> */}

                <View
                  style={styles.containMid}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Input
                    ref="contactperson"
                    style={styles.inputEmail}
                    editable={true}
                    onChangeText={(val) =>
                      this.setState({ contactperson: val })
                    }
                    returnKeyType="next"
                    autoCapitalize="words"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    placeholder="Contact Person"
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    value={this.state.contactperson}
                  />
                </View>
                <View
                  style={styles.containMid}
                  pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                  <Input
                    ref="contactno"
                    style={styles.inputEmail}
                    editable={true}
                    onChangeText={(val) => this.setState({ contactno: val })}
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="words"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    placeholder="Contact Number"
                    placeholderTextColor="rgba(0,0,0,0.20)"
                    value={this.state.contactno}
                  />
                </View>
                <View style={[styles.containImageTop]}>
                  <Text style={[Style.textBlack, { paddingTop: 5 }]}>
                    Upload Photo SIUP
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 2,
                      borderWidth: 1,
                      borderColor: "#d3d3d3",
                      margin: 10,
                    }}
                    onPress={() => this.showAlert("pictUrlSIUP")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    {/* <Image
                                            style={{ width: 200, height: 100 }}
                                            source={this.state.pictUrlKtp}
                                        /> */}
                    {this.state.pictUrlSIUP == null ||
                    this.state.pictUrlSIUP == "" ? (
                      <View>
                        {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                        <Image
                          style={{ width: 200, height: 130 }}
                          source={
                            (uri = require("../../assets/images/ktp.png"))
                          }
                        />
                      </View>
                    ) : (
                      <Image
                        // resizeMode="cover"
                        style={{ width: 200, height: 130 }}
                        source={this.state.pictUrlSIUP}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={[styles.containImageTop]}>
                  <Text style={[Style.textBlack, { paddingTop: 5 }]}>
                    Upload Photo TDP
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 2,
                      borderWidth: 1,
                      borderColor: "#d3d3d3",
                      margin: 10,
                    }}
                    onPress={() => this.showAlert("pictUrlTDP")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    {/* <Image
                                            style={{ width: 200, height: 100 }}
                                            source={this.state.pictUrlKtp}
                                        /> */}
                    {this.state.pictUrlTDP == null ||
                    this.state.pictUrlTDP == "" ? (
                      <View>
                        {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                        <Image
                          style={{ width: 200, height: 130 }}
                          source={
                            (uri = require("../../assets/images/ktp.png"))
                          }
                        />
                      </View>
                    ) : (
                      <Image
                        // resizeMode="cover"
                        style={{ width: 200, height: 130 }}
                        source={this.state.pictUrlTDP}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={[styles.containImageTop]}>
                  <Text style={[Style.textBlack, { paddingTop: 5 }]}>
                    Upload Photo NPWP
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 2,
                      borderWidth: 1,
                      borderColor: "#d3d3d3",
                      margin: 10,
                    }}
                    onPress={() => this.showAlert("pictUrlNPWP")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    {/* <Image
                                            style={{ width: 200, height: 100 }}
                                            source={this.state.pictUrlKtp}
                                        /> */}
                    {this.state.pictUrlNPWP == null ||
                    this.state.pictUrlNPWP == "" ? (
                      <View>
                        {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                        <Image
                          style={{ width: 200, height: 130 }}
                          source={
                            (uri = require("../../assets/images/ktp.png"))
                          }
                        />
                      </View>
                    ) : (
                      <Image
                        // resizeMode="cover"
                        style={{ width: 200, height: 130 }}
                        source={this.state.pictUrlNPWP}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={[styles.containImageTop]}>
                  <Text style={[Style.textBlack, { paddingTop: 5 }]}>
                    Upload Photo Domicile
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 2,
                      borderWidth: 1,
                      borderColor: "#d3d3d3",
                      margin: 10,
                    }}
                    onPress={() => this.showAlert("pictUrlDomisili")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    {/* <Image
                                            style={{ width: 200, height: 100 }}
                                            source={this.state.pictUrlKtp}
                                        /> */}
                    {this.state.pictUrlDomisili == null ||
                    this.state.pictUrlDomisili == "" ? (
                      <View>
                        {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                        <Image
                          style={{ width: 200, height: 130 }}
                          source={
                            (uri = require("../../assets/images/ktp.png"))
                          }
                        />
                      </View>
                    ) : (
                      <Image
                        // resizeMode="cover"
                        style={{ width: 200, height: 130 }}
                        source={this.state.pictUrlDomisili}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={[styles.containImageTop]}>
                  <Text
                    style={[
                      Style.textBlack,
                      { paddingTop: 5, textAlign: "center" },
                    ]}
                  >
                    Upload Photo Akte Pendirian & Perubahan Perusahaan
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 2,
                      borderWidth: 1,
                      borderColor: "#d3d3d3",
                      margin: 10,
                    }}
                    onPress={() => this.showAlert("pictUrlAktePendirian")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    {/* <Image
                                            style={{ width: 200, height: 100 }}
                                            source={this.state.pictUrlKtp}
                                        /> */}
                    {this.state.pictUrlAktePendirian == null ||
                    this.state.pictUrlAktePendirian == "" ? (
                      <View>
                        {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                        <Image
                          style={{ width: 200, height: 130 }}
                          source={
                            (uri = require("../../assets/images/ktp.png"))
                          }
                        />
                      </View>
                    ) : (
                      <Image
                        // resizeMode="cover"
                        style={{ width: 200, height: 130 }}
                        source={this.state.pictUrlAktePendirian}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={[styles.containImage]}>
                  <Text style={[Style.textBlack, { paddingTop: 5 }]}>
                    Upload Photo KTP (Commissioner + Director)
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 2,
                      borderWidth: 1,
                      borderColor: "#d3d3d3",
                      margin: 10,
                    }}
                    onPress={() => this.showAlert("pictUrlKtp")}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                  >
                    {/* <Image
                                            style={{ width: 200, height: 100 }}
                                            source={this.state.pictUrlKtp}
                                        /> */}
                    {this.state.pictUrlKtp == null ||
                    this.state.pictUrlKtp == "" ? (
                      <View>
                        {/* <Icon name='image' type="FontAwesome5" style={{ color: Colors.navyUrban,fontSize: 50, top: Metrics.WIDTH * 0.05,justifyContent: 'space-between', textAlign: 'center', alignSelf: 'center', alignItems: 'center'}} /> */}
                        <Image
                          style={{ width: 200, height: 130 }}
                          source={
                            (uri = require("../../assets/images/ktp.png"))
                          }
                        />
                      </View>
                    ) : (
                      <Image
                        // resizeMode="cover"
                        style={{ width: 200, height: 130 }}
                        source={this.state.pictUrlKtp}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={[
              pickerSelectStyles.checkBoxWrap,
              {
                flexDirection: "row",
                backgroundColor: "#fff",
                height: 30,
                marginTop: 8,
                marginBottom: 8,
                borderRadius: 10,
              },
            ]}
          >
            <CheckBox
              // title={`I have read and accept the terms & conditions`}
              // title={this.titleCheckbox}

              checked={this.state.checked}
              onPress={this.handleCheck}
              style={{ justifyContent: "center", alignItems: "center" }}
            />

            {this.state.files.map((val, key) => (
              <View
                key={key}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>I have read and accept </Text>
                  <Text
                    onPress={() => this.downloadFile(val)}
                    style={{ textDecorationLine: "underline" }}
                  >
                    the terms & conditions
                  </Text>
                </View>
              </View>
            ))}

            {/* {this.state.files.map((val,key)=> 
                        <View key={key} >
                            <Text onPress={()=>this.downloadFile(val)}>
                            I have read and accept the terms & conditions
                            </Text>
                        </View>
                        
                        )} */}
          </View>

          {/* <Button onPress={this.handleBuy}  style={{alignSelf : 'center', marginTop : 20}}>
                        <Text style={{fontFamily :'Montserrat-Regular'}}>Accept</Text>
                    </Button> */}
          <View
            style={styles.signbtnSec}
            pointerEvents={this.state.isLoaded ? "auto" : "none"}
          >
            <Button
              style={[
                styles.signInBtn,
                {
                  backgroundColor: !this.state.checked ? "#cccccc" : "#0691ce",
                },
              ]}
              onPress={() => this.submit()}
              disabled={!this.state.checked}
            >
              {!this.state.isLoaded ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signInBtnText}>Register Now</Text>
              )}
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
export default SignupPrincipless;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    ...styles.inputEmail,
    fontSize: 17,
  },
  textBox: {
    flex: 1,
    height: Dimensions.get("window").height * 0.6,
    backgroundColor: "#fff",
    marginHorizontal: 30,
    paddingHorizontal: 20,
    marginTop: 20,
    paddingTop: 10,
    borderColor: "#333",
    borderWidth: 1,
  },
  checkBoxWrap: {
    marginHorizontal: 10,
  },
});
