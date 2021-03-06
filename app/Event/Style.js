const React = require("react-native");
const { Platform } = React;
import { Fonts, Metrics, Colors } from "../Themes/";

export default {
  // internalPickerContainer: {
  //     flex: Platform.OS === 'ios' ? 1 : null, // for Android, not visible otherwise.
  //     width: Platform.OS === 'ios' ? undefined : 120,
  //   },
  //   pickerIosListItemContainer: {
  //     flex: 1,
  //     height: 60,
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },
  //   pickerIosListItemText: {
  //     fontSize: 12,
  //   },
  viewRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 15
  },
  viewRowUnit: {
    flexDirection: "row",
    // borderBottomWidth:1,
    // borderBottomColor:'#000',
    marginBottom: 1
    // textAlign: 'center'
  },
  viewRowHarga: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 5
  },
  viewAddmore: {
    // flexDirection: 'row',
    // borderBottomWidth:1,
    // borderBottomColor:'#000',
    marginBottom: 15,
    // color:
    alignItems: "center",
    alignSelf: "center"
  },
  viewRowQty: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  textLeft: {
    justifyContent: "flex-start",
    flex: 1,
    paddingBottom: 10,
    fontFamily: Fonts.type.proximaNovaBold,
    letterSpacing: 2,
    color: Colors.darkblueUrban
  },
  textLeftQty: {
    justifyContent: "flex-start",
    flex: 1,
    paddingBottom: 5,
    fontFamily: Fonts.type.proximaNovaBold,
    letterSpacing: 2,
    color: Colors.darkblueUrban,
    alignItems: "center",
    alignSelf: "center"
  },
  textLeftAmt: {
    justifyContent: "flex-start",
    flex: 1,
    paddingBottom: 10,
    fontFamily: Fonts.type.proximaNovaReg,
    letterSpacing: 2,
    fontSize: 13,
    color: Colors.darkblueUrban,
    margin: 0
  },
  textRight: {
    justifyContent: "flex-end",
    fontSize: 14
  },
  btnMedium: {
    backgroundColor: Colors.goldUrban,
    // height: Metrics.HEIGHT * 0.10,
    height: 50,
    width: 250,
    paddingLeft: 20,
    paddingRight: 20,
    // width: '100%',
    alignSelf: "center",
    elevation: 3,
    // shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  marginround: {
    height: 45,
    marginBottom: 4,
    marginLeft: 12,
    marginRight: 12,
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: Colors.greyUrban,
    textAlignVertical: "bottom"
  },
  positionTextInput: {
    fontSize: 15,
    left: 8,
    // paddingBottom: 3,
    // backgroundColor: '#fff'
    color: Colors.greyUrban,
    fontFamily: Fonts.type.proximaNovaReg
  },
  inputAttach: {
    height: 40,
    // marginBottom: 4,
    paddingBottom: 15,
    marginLeft: 12,
    marginRight: 12,
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: Colors.greyUrban
    // textAlignVertical: 'bottom',
  },
  textAttach: {
    color: Colors.greyUrban,
    fontFamily: Fonts.type.proximaNovaBoldWeb,
    position: "absolute",
    left: 10,
    fontSize: 13
  },
  inputAttachLarge: {
    height: "auto",
    marginBottom: 4,
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 10,
    paddingTop: 10,
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: Colors.greyUrban,
    textAlignVertical: "bottom"
  },
  containImageTop_no: {
    // backgroundColor: "#fff",
    width: Metrics.WIDTH * 0.73,
    // width: Metrics.WIDTH,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3
  }
};
