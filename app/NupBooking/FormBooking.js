//import liraries
import React from "react";
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  View,
  FlatList,
  Modal,
  ListView,
  Alert,
  // Picker
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Title,
  Left,
  Right,
  Body,
  Input,
  Item,
  Footer,
  FooterTab,
  Badge,
  Picker,
  Col,
  ListItem,
  Label,
} from "native-base";

// import NavigationService from "@Service/Navigation";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from "@Component/numFormat";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
// import ImageViewer from 'react-native-image-zoom-viewer';
import ImageResizer from "react-native-image-resizer";

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get("window");
let isMount = false;

class FormBooking extends React.Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      fullname: "",
      mobilephone: "",
      email: "",
      nik: "",
      npwp: "",
      pictUrlKtp: "",
      pictUrlNPWP: "",
      replaceFoto: "file:///urbanAPI/images/noimage-min.png",
      isLoaded: true,
      bank_name: "",
      account_no: "",
      account_name: "",
      dataFromNik: [],
      cor: "",
      projectdesc: "",
      Alert_Visibility: false,
      pesan: "",
      capt: false,
      filektp__: "",
      filektp_testing: "",
      darinik: false,
      //data data dari nik
      //   full_name: ""
    };
    // console.log()
    isMount = true;

    this.showAlert = this.showAlert.bind(this);
    // this.alertFillBlank = this.alertFillBlank.bind(this);
  }

  async componentDidMount() {
    isMount = true;
    const dataPrev = this.props.prevItems;
    const subtot = this.props.subtot;
    const totalqty = this.props.totalqty;
    console.log("subtot", subtot);
    console.log("totalqty", totalqty);
    console.log("dataprev", dataPrev);
    // const items = this.props.items;
    // const dataFromNik = this.state.dataFromNik;
    // console.log("dataFromNikddd", dataFromNik);

    const data = {
      project_no: this.props.items.project_no,
      entity: this.props.items.entity_cd,
      //   audit_user: await _getData("@UserId"),
      audit_user: await _getData("@AgentCd"),
      projectdesc: this.props.items.project_descs,
      subtot: this.props.subtot,
      totalqty: this.props.totalqty,
      //   fullname: this.state.dataFromNik.dataFormNik[0].full_name
      //   full_name: this.state.dataFromNik[0].full_name
      // lot_type: this.props.prevItems.lot_type,
      // nama_tower: this.props.prevItems.nama_tower,
      // nama_unit: this.props.prevItems.nama_unit,
      // project_descs: this.props.prevItems.project_descs,
      // property_cd: this.props.prevItems.property_cd,
      // qty: this.props.prevItems.qty,
      // total: this.props.prevItems.total
    };
    console.log("data", data);

    this.setState(data, () => {
      //   this.getDataFromNik();
    });
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

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

  // showAlert = (key) =>{
  //     alert('tes')
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
      height: 500,
      compressImageQuality: 0.7,
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 500,
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
      height: 500,
      compressImageQuality: 0.7,
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 500,
    })
      .then((image) => {
        console.log("received image", image);

        this.setState({ [key]: { uri: image.path } });
      })
      .catch((e) => console.log("tag", e));
  }

  modalBankMaster() {
    Actions.modalBankMaster();
  }

  componentWillReceiveProps(props) {
    // props dari B
    const itemBank = props.itemBank; // props dari B
    console.log("props getback", itemBank);
    if (itemBank) {
      this.setState({ bank_name: itemBank.value });
    }
  }

  // resize() {
  //   console.log("this.state.pictUrlKtp.uri", this.state.pictUrlKtp.uri);
  //   ImageResizer.createResizedImage(
  //     this.state.pictUrlKtp.uri,
  //     80,
  //     60,
  //     "JPEG",
  //     100
  //   )
  //     .then(({ uri }) => {
  //       this.setState({
  //         pictUrlKtp: { uri: uri },
  //       });
  //       // console.log("size", this.state.pictUrlKtp);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return Alert.alert(
  //         "Unable to resize the photo",
  //         "Check the console for full the error message"
  //       );
  //     });
  // }

  submit = () => {
    this.setState({ isLoaded: !this.state.isLoaded });

    let filektp = "";
    let filenpwp = "";
    let tes_filektp = "";
    let tes_filenpwp = "";
    console.log("dari nik", this.state.darinik);
    // const filektp_testing = "";
    // RNFetchBlob.wrap(
    //     this.state.pictUrlKtp.uri.replace("file://", "")
    // );
    // console.log("pic not nul", this.state.pictUrlKtp);
    if (this.state.pictUrlKtp == 0) {
      console.log("replace", this.state.replaceFoto);
      // filektp = "@Asset/images/icon/dropdown.png";
      filektp = "./img/noimage.png";
      // "file:///data/user/0/com.ifcasoftware.urban/cache/react-native-image-crop-picker/image-7db81647-c261-4066-8e0e-46a4417e15e24941063510417621352.jpg"
      // "RNFetchBlob-file:///data/user/0/com.ifcasoftware.urban/cache/react-native-image-crop-picker/image-7db81647-c261-4066-8e0e-46a4417e15e24941063510417621352.jpg"
      // filektp = this.state.replaceFoto;
      // filektp = RNFetchBlob.wrap(
      //     this.state.replaceFoto
      // );
      console.log("pic nul", this.state.pictUrlKtp);
      // this.state.replaceFoto.uri.replace("file://", "")
    } else {
      filektp = RNFetchBlob.wrap(
        this.state.pictUrlKtp.uri.replace("file://", "")
      );
      // this.state.pictUrlKtp.uri.replace("file://", "");
      // if (this.state.darinik == true) {
      //   // filektp = this.state.pictUrlKtp.uri;
      //   filektp = RNFetchBlob.wrap(
      //     this.state.pictUrlKtp.uri.replace("http://", "")
      //   );
      //   console.log("filektp dari nik", filektp);
      // } else {
      //   filektp = RNFetchBlob.wrap(
      //     this.state.pictUrlKtp.uri.replace("file://", "")
      //   );
      // }
      console.log("pic not nul", this.state.pictUrlKtp);

      // this.setState({ isLoaded: true });
      // this.state.pictUrlKtp.uri.replace("file://", "")
    }

    if (this.state.pictUrlNPWP == 0) {
      console.log("replace", this.state.replaceFoto);
      filenpwp = "./img/noimage.png";
      console.log("pic nul", this.state.pictUrlNPWP);
    } else {
      filenpwp = RNFetchBlob.wrap(
        this.state.pictUrlNPWP.uri.replace("file://", "")
      );
      // this.state.pictUrlNPWP.uri.replace("file://", "");
      // if (this.state.darinik == true) {
      //   filenpwp = RNFetchBlob.wrap(
      //     this.state.pictUrlNPWP.uri.replace("http://", "")
      //   );
      // } else {
      //   filenpwp = RNFetchBlob.wrap(
      //     this.state.pictUrlNPWP.uri.replace("file://", "")
      //   );
      // }

      console.log("pic not nul", this.state.pictUrlNPWP);
    }

    // Do something

    // let filenpwp = RNFetchBlob.wrap(
    //     this.state.pictUrlNPWP.uri.replace("file://", "")
    // );

    const dataPrev = this.props.prevItems;
    // const projectDescs = dataPrev.project_descs;
    // console.log('projectDescs',projectDescs);
    console.log("dataprev", dataPrev);

    const {
      fullname,
      mobilephone,
      email,
      nik,
      npwp,
      projectdesc,
      project_no,
      entity,
      audit_user,
      subtot,
      totalqty,
      bank_name,
      account_name,
      account_no,
      cor,
    } = this.state;

    const frmData = {
      fullname: fullname,
      mobilephone: mobilephone,
      email: email,
      nik: nik,
      npwp: npwp,
      //---------foto attachment
      pictUrlKtp: filektp, //ktp
      pictUrlNPWP: filenpwp,
      //---------end foto attachment

      project_descs: projectdesc,
      arrayData: dataPrev,

      total: subtot,
      total_qty: totalqty,
      project_no: project_no,
      entity: entity,
      audit_user: audit_user,
      bank_name: bank_name,
      account_name: account_name,
      account_no: account_no,
      cor: cor,
      agent_cd: audit_user,
    };

    const isValid = this.validating({
      email: { require: true },
      nik: { require: true },
      fullname: { require: true },
      // account_name: { require: true },
      // account_no: { require: true },
      // bank_name: { require: true },
      cor: { require: true },
      mobilephone: { require: true },
      npwp: { require: true },
    });

    let fileNameKtp = "";
    if (this.state.pictUrlKtp.length == 0) {
      console.log(this.state.pictUrlKtp.length);
      fileNameKtp = "./img/noimage.png";
    } else {
      fileNameKtp = "KTP_BookingPriorty_" + nik + ".png";
    }

    let fileNameNpwp = "";
    if (this.state.pictUrlNPWP.length == 0) {
      console.log(this.state.pictUrlNPWP.length);
      fileNameNpwp = "./img/noimage.png";
    } else {
      fileNameNpwp = "npwp_BookingPriorty_" + nik + ".png";
    }

    // console.log('filenamektp', nik);

    // let fileNameBukuTabungan = "bukutabungan_RegisAgent_" + nik + ".png";
    // let fileNameSuratAnggota= "suratanggota_RegisAgent_" + nik + ".png";

    console.log("saveFormNUP", frmData);
    // console.log('leng nik',this.state.nik.length);
    console.log("leng foto ktp", this.state.pictUrlKtp.length);
    // if(this.state.pictUrlKtp.length == 7 || filektp.length == 7){
    //     console.log(this.state.pictUrlKtp.length)
    //     alert('panjang 7')
    // }else{
    //     console.log(this.state.pictUrlKtp.length)
    //     alert('lebih dari 7')
    // }

    // let fileName = "KTP_RegisAgent.png";
    // let fileImg = "";
    // console.log('pic ktp', pictUrlKtp);
    // if ( pictUrlKtp || pictUrlNPWP ) {
    //     // console.log('pic ktp', pictUrlKtp)
    //         this.setState({ errors: false })
    //         alert('gak error');
    //         console.log('gak error');

    //     } else {
    //         this.setState({ errors: true })
    //         alert("Please upload attachments")
    //         console.log('error')
    //     }

    // if(filektp != "" || filektp != null){
    //     console.log('filektp', filektp)
    // }

    // if(isValid){
    //     _navigate("FormPayment", { prevItems: frmData });

    // }
    //
    if (isValid) {
      RNFetchBlob.fetch(
        "POST",
        // urlApi + "c_auth/SignUpAgent",
        urlApi + "c_nup/saveNup/IFCAPB/",
        {
          "Content-Type": "multipart/form-data",
        },
        [
          // { name: "photo", filename: fileName, data: fileImg },
          { name: "photoktp", filename: fileNameKtp, data: filektp },
          { name: "photonpwp", filename: fileNameNpwp, data: filenpwp },
          // { name: "photobukutabungan", filename: fileNameBukuTabungan, data: filebukutabungan },
          // { name: "photosuratanggota", filename: fileNameSuratAnggota, data: filesuratanggota},
          { name: "data", data: JSON.stringify(frmData) },
        ]
      ).then((resp) => {
        console.log("res_if", resp);
        const res = JSON.parse(resp.data);
        console.log("res", res);
        // const res = JSON.stringify(resp.data);

        if (!res.Error) {
          // Actions.pop()
          this.setState({ isLogin: true }, () => {
            // alert(res.Pesan);
            const pesan = res.Pesan;
            this.alertFillBlank(true, pesan);
            // Actions.pop()
            // Actions.Login()
            _navigate("FormPayment", { prevItems: frmData });
          });
        } else {
          // const pesan = res.Pesan;
          // this.alertFillBlank(true, pesan);
          this.setState({ isLoaded: true }, () => {
            // alert(res.Pesan);
            const pesan = res.Pesan;
            this.alertFillBlank(true, pesan);
            console.log("error 3mb");
            // console.log('url',this.state.pickUrlKtp.uri)
          });

          // this.setState({ isLoaded: this.state.isLoaded }, () => {
          //   const pesan = "3mb image";
          //   this.alertFillBlank(true, pesan);
          //   console.log("error 3mb");
          //   // alert("Please input field");
          //   // alert(res.Pesan);
          //   // console.log('url',this.state.pickUrlKtp.uri)
          // });
        }

        // this.setState({ isLoaded: true });
        this.setState({ isLoaded: true }, () => {
          // alert(res.Pesan);
          const pesan = res.Pesan;
          this.alertFillBlank(true, pesan);
          // console.log('url',this.state.pickUrlKtp.uri)
        });
        // alert(res.Pesan);
      });
    } else {
      // alert("Please input field");
      // const pesan = "Please input field";
      // this.alertFillBlank(true, pesan);
      this.setState({ isLoaded: true }, () => {
        const pesan = "Please input field";
        this.alertFillBlank(true, pesan);
        // alert("Please input field");
        // alert(res.Pesan);
        // console.log('url',this.state.pickUrlKtp.uri)
      });
      // alert("Please");
      // console.log('url else',this.state.pickUrlKtp.uri)
    }
  };

  submit2 = () => {
    let filektp = "";
    console.log("pic not nulaa", this.state.pictUrlKtp);
    console.log("replace", this.state.pictUrlKtp.replace("http://", ""));
    // if (this.state.pictUrlKtp == 0) {
    //   console.log("replace", this.state.replaceFoto);
    //   // filektp = "@Asset/images/icon/dropdown.png";
    //   filektp = "./img/noimage.png";

    //   console.log("pic nul", this.state.pictUrlKtp);
    //   // this.state.replaceFoto.uri.replace("file://", "")
    // } else {
    //   // alert('not null')
    //   filektp = RNFetchBlob.wrap(
    //     this.state.pictUrlKtp.uri.replace("http://", "")
    //   );
    //   console.log("pic not nul", this.state.pictUrlKtp);
    //   // this.state.pictUrlKtp.uri.replace("file://", "")
    // }
  };

  cariNIK(carinik) {
    this.setState({ loadingnik: true });
    console.log("carinik", carinik);
    if (carinik) {
      let nik_no = carinik.carinik;
      console.log("nikno", nik_no);
      this.getDataFromNik(nik_no);
    }
    //   if (this.state.dataFromNik == 0) {

    //   }
  }

  getDataFromNik(nik_no) {
    const item = this.props.items;
    console.log("item tower", item);
    {
      isMount
        ? fetch(
            urlApi +
              "c_nup/getDataFromNik/" +
              item.db_profile +
              "/" +
              item.entity_cd +
              "/" +
              item.project_no +
              "/" +
              nik_no,
            {
              method: "GET",
              headers: this.state.hd,
              //   body: JSON.stringify({entity_cd: item.entity_cd, proj})
            }
          )
            .then((response) => response.json())
            .then((res) => {
              if (!res.Error) {
                const resData = res.Data;
                // this.setState({ dataFromNik: resData });
                this.cekNIK({ dataFromNik: resData });
                this.setState({ loadingnik: false });
                this.setState({ darinik: true });
              } else {
                this.setState(
                  {
                    isLoaded: this.state.isLoaded,
                    loadingnik: false,
                    darinik: true,
                  },
                  () => {
                    const pesan = res.Pesan;
                    this.alertFillBlank(true, pesan);
                    // alert(res.Pesan);
                    console.log(res.Pesan);
                    // this.setState({ loadingnik: false });
                  }
                );
              }
              this.setState({ loadingnik: false });
              console.log("dataFromNik", res);
            })
            .catch((error) => {
              console.log(error);
            })
        : null;
    }
  }

  cekNIK(dataFromNik) {
    console.log("cekNIK", dataFromNik);
    let url_ktp =
      dataFromNik.dataFromNik[0].ktp_attachment +
      "?random_number=" +
      new Date().getTime();
    let url_npwp =
      dataFromNik.dataFromNik[0].npwp_attachment +
      "?random_number=" +
      new Date().getTime();
    if (dataFromNik) {
      this.setState({
        fullname: dataFromNik.dataFromNik[0].full_name,

        mobilephone: dataFromNik.dataFromNik[0].mobile_phone,
        email: dataFromNik.dataFromNik[0].email,
        // nik: dataFromNik.dataFromNik[0].nik,
        npwp: dataFromNik.dataFromNik[0].npwp_no,
        //---------foto attachment
        // pictUrlKtp: dataFromNik.dataFromNik[0].ktp_attachment, //ktp
        // pictUrlNPWP: dataFromNik.dataFromNik[0].npwp_attachment,
        //---------end foto attachment

        bank_name: dataFromNik.dataFromNik[0].bank_name,
        account_name: dataFromNik.dataFromNik[0].account_name,
        account_no: dataFromNik.dataFromNik[0].account_no,
        cor: dataFromNik.dataFromNik[0].address1,
        // pictUrlKtp: { uri: url_ktp },
        // pictUrlNPWP: { uri: url_npwp },
      });
      // fullname = dataFromNik.dataFromNik[0].full_name;
      // console.log("fullname", fullname);
      //   console.log("fullname", this.state.fullname);
    } else {
      const pesan = "Nik not found, please try again";
      this.alertFillBlank(true, pesan);
      // alert("Nik not found");
    }
  }
  alertFillBlank(visible, pesan) {
    this.setState({ Alert_Visibility: visible, pesan: pesan });
  }

  render() {
    return (
      <Container style={Style.bgMain}>
        <StatusBar
          backgroundColor={Colors.statusBarNavy}
          animated
          barStyle="light-content"
        />
        {/* <Header style={[Style.navigation,{backgroundColor: 'transparent'}]}>
                    <StatusBar
                        backgroundColor={Colors.statusBarNavy}
                        animated
                        barStyle="light-content"
                    />

                    <View style={Style.actionBarLeft}>
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
                    </View>
                    <View style={Style.actionBarMiddle}>
                        <Text style={Style.actionBarText}>
                         
                            {this.state.title}
                            
                        </Text>
                        <Text style={Style.actionBarText}>
                        
                            {this.state.towerDescs}
                            
                        </Text>
                        
                    </View>
                    <View style={Style.actionBarRight} />
                </Header> */}

        <View style={{ top: 25, paddingBottom: 45 }}>
          <View style={{ paddingLeft: 15, paddingTop: 15 }}>
            <Button
              transparent
              style={Style.actionBarBtn}
              onPress={Actions.pop}
            >
              <Icon
                active
                name="arrow-left"
                // style={[Style.textWhite,{fontSize: 28}]}
                style={{ color: "#000" }}
                type="MaterialCommunityIcons"
              />
            </Button>
          </View>

          <View>
            <Text
              style={{
                fontWeight: "900",
                color: Colors.goldUrban,
                fontSize: 16,
                textAlign: "center",
                fontFamily: Fonts.type.proximaNovaBold,
                letterSpacing: 1,
              }}
              // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
            >
              BOOKING PRIORITY PASS
            </Text>
            <Text
              style={{
                // fontWeight: "900",
                color: Colors.goldUrban,
                fontSize: 13,
                textAlign: "center",
                fontFamily: Fonts.type.proximaNovaBold,
                letterSpacing: 1,
              }}
            >
              {this.state.projectdesc}
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 40 }}>
          <Modal
            visible={this.state.Alert_Visibility}
            transparent={true}
            animationType={"slide"}
            onRequestClose={() => {
              this.alertFillBlank(!this.state.Alert_Visibility, pesan);
            }}
            // activeOpacity={1}
          >
            <View
              style={{
                // backgroundColor: "red",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: "70%",
                  height: "20%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.type.proximaNovaReg,
                    fontSize: 17,
                    paddingBottom: 15,
                    color: Colors.black,
                    textAlign: "center",
                  }}
                >
                  {this.state.pesan}
                </Text>
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.goldUrban,
                      height: 40,
                      width: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      this.alertFillBlank(!this.state.Alert_Visibility);
                      this.setState({ isLoaded: this.state.isLoaded });
                      console.log("isloading ok", this.state.isLoaded);
                    }}
                    // activeOpacity={0.7}
                  >
                    <Text style={{ color: Colors.white }}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View style={{ paddingBottom: 10, marginTop: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                NIK
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                NIK
              </Label> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
              <Input
                placeholder="NIK"
                // autoCapitalize="numeric"
                keyboardType="numeric"
                placeholderTextColor={"#c2c2c2"}
                // placeholderFontSize={10}
                value={this.state.nik}
                onChangeText={(val) => this.setState({ nik: val })}
                // onChangeText={val => this.getNik({ val })}
                style={Styles.positionTextInput}
                ref="nik"
              />

              {this.state.errornik ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}
              {/* <Icon name='close-circle' /> */}
            </Item>
            {this.state.loadingnik == true ? (
              <ActivityIndicator
                style={{
                  bottom: 20,
                  fontSize: 25,
                  position: "absolute",
                  right: 20,
                }}
              />
            ) : (
              <Icon
                style={{
                  color: Colors.greyUrban,
                  bottom: 20,
                  fontSize: 25,
                  position: "absolute",
                  right: 20,
                }}
                name="search"
                onPress={() => this.cariNIK({ carinik: this.state.nik })}
              />
            )}

            {/* <Text
              style={{
                position: "absolute",
                bottom: 3,
                left: 15,
                color: "red",
                fontSize: 12
              }}
            >
              NIK Required
            </Text> */}
            {this.state.errornik ? (
              <Text style={Styles.text_error}>NIK Required</Text>
            ) : null}
          </View>
          <View style={{ paddingBottom: 10, marginTop: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                Full Name
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Full Name
              </Label> */}
              {/* <Label>customer</Label> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
              <Input
                placeholder="Full Name"
                // editable={true}
                autoCapitalize="words"
                placeholderTextColor={"#c2c2c2"}
                // placeholderStyle={{ paddingLeft: 20 }}
                value={this.state.fullname}
                onChangeText={(val) => this.setState({ fullname: val })}
                style={Styles.positionTextInput}
                ref="fullname"
                // textAlign={"right"}
              />

              {this.state.errorfullname ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}

              {/* <Icon name='close-circle' /> */}
            </Item>
            {this.state.fullname ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}

            {/* <Text>(customer)</Text> */}
            {this.state.errorfullname ? (
              <Text style={Styles.text_error}>Full Name Required</Text>
            ) : null}
          </View>
          <View style={{ paddingBottom: 10, marginTop: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                Mobile Phone
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Mobile Phone
              </Label> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
              <Input
                placeholder="Mobile Phone"
                // autoCapitalize="numeric"
                keyboardType="numeric"
                placeholderTextColor={"#c2c2c2"}
                value={this.state.mobilephone}
                onChangeText={(val) => this.setState({ mobilephone: val })}
                style={Styles.positionTextInput}
                ref="mobilephone"
              />
              {this.state.errormobilephone ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}
              {/* <Icon name='close-circle' /> */}
            </Item>
            {this.state.mobilephone ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}
            {this.state.errormobilephone ? (
              <Text style={Styles.text_error}>Mobile Phone Required</Text>
            ) : null}
          </View>
          <View style={{ paddingBottom: 10, marginTop: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                Email
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Email
              </Label> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
              <Input
                placeholder="Email"
                autoCapitalize="words"
                placeholderTextColor={"#c2c2c2"}
                value={this.state.email}
                onChangeText={(val) => this.setState({ email: val })}
                style={Styles.positionTextInput}
                ref="email"
              />
              {this.state.erroremail ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}
              {/* <Icon name='close-circle' /> */}
            </Item>
            {this.state.email ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}
            {this.state.erroremail ? (
              <Text style={Styles.text_error}>Email Required</Text>
            ) : null}
          </View>
          <View style={{ paddingBottom: 10, marginTop: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                Address
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Address
              </Label> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
              <Input
                placeholder="Address (max 60)"
                autoCapitalize="words"
                placeholderTextColor={"#c2c2c2"}
                value={this.state.cor}
                onChangeText={(val) => this.setState({ cor: val })}
                style={Styles.positionTextInput}
                ref="cor"
                maxLength={60}
              />
              {this.state.errorcor ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}
              {/* <Icon name='close-circle' /> */}
            </Item>
            {this.state.cor ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}
            {this.state.errorcor ? (
              <Text style={Styles.text_error}>Address Required</Text>
            ) : null}
          </View>
          {/* <View style={{ paddingBottom: 15, marginTop: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",

                left: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#bfbfbf" : Colors.greyUrban,
                  fontSize: 14,
                }}
              >
                Bank Name
              </Text>
            </View>
            <Item

              style={Styles.marginround}
              onPress={() => this.modalBankMaster()}
            >
              <Input

                autoCapitalize="words"

                placeholder="Choose Bank"
                placeholderTextColor={Colors.greyUrban}
                value={this.state.bank_name}
                onChangeText={(val) => this.setState({ bank_name: val })}
                style={Styles.positionTextInput}
                ref="nik"
                editable={false}
              />
              <Image
                style={{ width: 25, height: 25 }}
                source={require("@Asset/images/icon/dropdown_navy.png")}
              ></Image>
              {this.state.errorbank_name ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}

            </Item>

            {this.state.errorbank_name ? (
              <Text style={Styles.text_error}>Bank Name Required</Text>
            ) : null}
          </View> */}
          {/* <View style={{ paddingBottom: 15, marginTop: 4 }}>
            <Item floatingLabel style={Styles.marginround}>
              <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Bank Account Number
              </Label>

              <Input
                keyboardType="numeric"
                placeholderTextColor={Colors.greyUrban}
                value={this.state.account_no}
                onChangeText={(val) => this.setState({ account_no: val })}
                style={Styles.positionTextInput}
                ref="account_no"
              />

              {this.state.erroraccount_no ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}
            </Item>
            {this.state.account_no ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}
            {this.state.erroraccount_no ? (
              <Text style={Styles.text_error}>
                Bank Account Number Required
              </Text>
            ) : null}
          </View> */}
          {/* <View style={{ paddingBottom: 15, marginTop: 4 }}>

            <Item floatingLabel style={Styles.marginround}>
              <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                Bank Account Name
              </Label>

              <Input

                autoCapitalize="words"

                placeholderTextColor={Colors.greyUrban}
                value={this.state.account_name}
                onChangeText={(val) => this.setState({ account_name: val })}
                style={Styles.positionTextInput}
                ref="account_name"
              />
              {this.state.erroraccount_name ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}

            </Item>
            {this.state.account_name ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}
            {this.state.erroraccount_name ? (
              <Text style={Styles.text_error}>Bank Account Name Required</Text>
            ) : null}
          </View> */}
          <View style={{ paddingBottom: 10, marginTop: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingBottom: 0,
                left: 10,
                height: 10,
              }}
            >
              <Text
                style={{
                  color: this.state.bank_name ? "#c2c2c2" : Colors.greyUrban,
                  fontSize: 13,
                }}
              >
                NPWP
              </Text>
            </View>
            <Item style={Styles.marginround}>
              {/* <Label style={{ color: Colors.greyUrban, fontSize: 14 }}>
                NPWP
              </Label> */}

              <Input
                placeholder="NPWP"
                // autoCapitalize="words"
                placeholderTextColor={"#c2c2c2"}
                keyboardType="numeric"
                // placeholderTextColor={Colors.greyUrban}
                value={this.state.npwp}
                onChangeText={(val) => this.setState({ npwp: val })}
                style={Styles.positionTextInput}
                ref="npwp"
              />
              {this.state.errornpwp ? (
                <Icon style={Styles.icon_error} name="close-circle" />
              ) : null}
            </Item>
            {this.state.npwp ? null : (
              <Text
                style={{
                  color: Colors.greyUrban,
                  bottom: 25,
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                }}
              >
                (customer)
              </Text>
            )}
            {this.state.errornpwp ? (
              <Text style={Styles.text_error}>NPWP Required</Text>
            ) : null}
          </View>

          {/* KTP */}
          <View style={{ paddingTop: 10 }}>
            {this.state.pictUrlKtp == null || this.state.pictUrlKtp == "" ? (
              <Item
                regular
                style={[{ borderRadius: 5 }, Styles.inputAttach]}
                onPress={() => this.showAlert("pictUrlKtp")}
                pointerEvents={this.state.isLoaded ? "auto" : "none"}
              >
                <Text style={Styles.textAttach}>Attach KTP</Text>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    right: 10,
                  }}
                  source={require("@Asset/images/icon/image_blue.png")}
                ></Image>
              </Item>
            ) : (
              <Item
                regular
                style={[{ borderRadius: 5 }, Styles.inputAttachLarge]}
                onPress={() => this.showAlert("pictUrlKtp")}
                pointerEvents={this.state.isLoaded ? "auto" : "none"}
              >
                <View style={[Styles.containImageTop_no]}>
                  <Image
                    // resizeMode="cover"
                    style={{
                      width: 200,
                      height: 130,
                      alignContent: "center",
                    }}
                    source={this.state.pictUrlKtp}
                  />
                </View>

                <Image
                  style={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    right: 10,
                  }}
                  source={require("@Asset/images/icon/image.png")}
                ></Image>
              </Item>
            )}
          </View>
          {/* NPWP */}
          <View style={{ paddingTop: 25, paddingBottom: 10 }}>
            {this.state.pictUrlNPWP == null || this.state.pictUrlNPWP == "" ? (
              <Item
                regular
                style={[{ borderRadius: 5 }, Styles.inputAttach]}
                onPress={() => this.showAlert("pictUrlNPWP")}
                pointerEvents={this.state.isLoaded ? "auto" : "none"}
              >
                <Text style={Styles.textAttach}>Attach NPWP</Text>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    right: 10,
                  }}
                  source={require("@Asset/images/icon/image_blue.png")}
                ></Image>
              </Item>
            ) : (
              <Item
                regular
                style={[{ borderRadius: 5 }, Styles.inputAttachLarge]}
                onPress={() => this.showAlert("pictUrlNPWP")}
                pointerEvents={this.state.isLoaded ? "auto" : "none"}
              >
                <View style={[Styles.containImageTop_no]}>
                  <Image
                    // resizeMode="cover"
                    style={{
                      width: 200,
                      height: 130,
                      alignContent: "center",
                    }}
                    source={this.state.pictUrlNPWP}
                  />
                </View>

                <Image
                  style={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    right: 10,
                  }}
                  source={require("@Asset/images/icon/image.png")}
                ></Image>
              </Item>
            )}
          </View>

          <View>
            <View
              style={{ paddingTop: 50 }}
              pointerEvents={this.state.isLoaded ? "auto" : "none"}
            >
              <Button
                style={Styles.btnMedium}
                onPress={() => this.submit()}
                // disabled={!this.state.capt}
              >
                {!this.state.isLoaded ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    style={{
                      width: "100%",
                      fontSize: 14,
                      alignItems: "center",
                      textAlign: "center",
                      fontFamily: Fonts.type.proximaNovaBold,
                      letterSpacing: 1,
                    }}
                  >
                    Next
                  </Text>
                )}
              </Button>
            </View>
          </View>
        </ScrollView>
        {/* <ScrollView style={{height: '100%'}}>
                    
                </ScrollView> */}
      </Container>
    );
  }
}

//make this component available to the app
export default FormBooking;
