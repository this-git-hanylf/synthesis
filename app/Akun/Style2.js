const React = require("react-native");
const { Platform, StatusBar } = React;
import { Fonts, Metrics, Colors } from "../Themes/";
import { Dimensions } from "react-native";
const dh = Dimensions.get("window").height;
const dw = Dimensions.get("window").width;

export default {
  layoutContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  shadow: {
    flex: 1,
    height: 20,
  },

  slider: {
    flex: 1,
    width: "100%",
  },
  sliderImg: {
    flex: 1,
    width: 200,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  coverImg: {
    flex: 1,
    height: 360,
  },

  section: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  price: {
    color: "#333",
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
  },
  locationTop: {
    flexDirection: "row",
  },
  locationTopIcon: {
    color: "#999",
    fontSize: 20,
  },
  locationTopInfo: {
    color: "#999",
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    marginTop: 3,
  },

  count: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#E6E4E4",
  },
  countCol: {
    flexDirection: "row",
  },
  countItem: {
    flexGrow: 1,
    borderRightWidth: 1,
    borderColor: "#E6E4E4",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  countFirst: {
    paddingLeft: 20,
  },
  countNo: {
    fontFamily: "Montserrat-SemiBold",
  },
  countText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: "#999",
  },
  countIcon: {
    color: "#FCC300",
    marginRight: 10,
    fontSize: 24,
  },

  overview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  overviewTitle: {
    flex: 1,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 10,
  },
  overviewDesc: {
    flex: 1,
    color: "#666",
    lineHeight: 20,
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },

  gallery: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#f0f0f0",
  },
  galleryTitle: {
    flex: 1,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 10,
    color: "#333",
  },
  galleryImg: {
    flex: 1,
    color: "#666",
    lineHeight: 20,
    minHeight: 200,
  },

  amenities: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  amenityTitle: {
    flex: 1,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 10,
    color: "#333",
  },

  amenity: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  amenityIcon: {
    color: "#FCC300",
    fontSize: 24,
    marginBottom: 5,
  },
  amenityItem: {
    color: "#666",
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
  },

  location: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f0f0f0",
  },
  locationTitle: {
    flex: 1,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 10,
    color: "#333",
  },
  locationMap: {
    flex: 1,
    minHeight: 300,
  },

  owner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#999",
    // borderBottomWidth: 0.5
  },
  ownerTitle: {
    flex: 1,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 20,
    color: "#333",
  },
  ownerAvatar: {
    marginTop: 32,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "#DDD",
    padding: 5,
    alignItems: "center",
  },
  ownerAvatarImg: {
    borderRadius: 34,
    width: 75,
    height: 75,
  },
  ownerInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ownerName: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    color: Colors.white,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: "center",
  },
  ownerLocation: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: "#0099E4",
    alignSelf: "center",
  },
  ownerGrup: {
    fontFamily: Fonts.type.proximaNovaReg,
    fontSize: 10,
    color: Colors.white,
    alignSelf: "center",
    letterSpacing: 1,
  },

  ownerBlue: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: "#d",
    alignSelf: "center",
  },

  tabBorder: {
    backgroundColor: "#FCC300",
  },
  tabGrey: {
    backgroundColor: "#FFF",
    fontFamily: "Montserrat-Regular",
  },
  tabText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: "#999",
  },
  tabTextActive: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: "#333",
  },
  infoTab: {
    paddingVertical: 8,
  },
  infoItem: {
    // alignItems: "flex-start",
    // paddingVertical: 10,
    height: 5,
    paddingBottom: 15,
    borderBottomColor: "transparent",
    width: 200,
    marginBottom: 3,
    // backgroundColor: '#999'
  },
  infoItemLast: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    marginRight: 10,
    width: 60,
    height: 60,
  },
  infoHeader: {
    fontFamily: "Montserrat-Regular",
    color: "#333",
    marginBottom: 5,
    fontSize: 15,
  },
  infoDesc: {
    fontFamily: "Montserrat-Regular",
    color: "#999",
    fontSize: 12,
    flexWrap: "wrap",
    width: dw * 0.65,
  },

  formBg: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  col: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    fontFamily: "Montserrat-Regular",
    borderBottomWidth: 0,
    borderColor: "#DDD",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  textInputHalf: {
    fontFamily: "Montserrat-Regular",
    borderBottomWidth: 0,
    borderColor: "#DDD",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: "48.5%",
    marginBottom: 10,
    borderRadius: 5,
  },
  textInputMulti: {
    fontFamily: "Montserrat-Regular",
    borderBottomWidth: 0,
    borderColor: "#DDD",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        height: 100,
        paddingTop: 20,
      },
      android: {
        textAlignVertical: "top",
      },
    }),
  },
  btn: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#FCC300",
    paddingVertical: 15,
    paddingLeft: 5,
  },
  btnText: {
    fontFamily: "Montserrat-SemiBold",
    color: "#333",
    fontSize: 14,
    alignSelf: "center",
  },

  formBtnText: {
    fontFamily: "Montserrat-SemiBold",
    color: "#333",
    fontSize: 12,
  },
  formBtnIcon: {
    color: "#333",
    fontSize: 24,
  },

  sectionGrey: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: "#f0f0f0",
  },
  flatList: {
    paddingLeft: 15,
  },
  headerBg: {
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  headerIcon: {
    fontSize: 24,
    color: "#333",
  },
  sHeader: {
    color: "#333",
    marginLeft: 3,
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
    marginTop: 5,
  },
  sBtn: {
    padding: 1,
    backgroundColor: "#e7e7e7",
    color: "#FFF",
  },
  sLink: {
    color: "#666",
    fontSize: 10,
    fontFamily: "Montserrat",
  },
  item: {
    width: 200,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    elevation: 10,
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  itemImg: {
    marginBottom: 10,
    width: 200,
    height: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  itemFavorite: {
    position: "absolute",
    alignSelf: "flex-end",
    color: "#FF0000",
    marginTop: 10,
    paddingRight: 10,
  },
  itemPrice: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    paddingHorizontal: 20,
  },
  itemLocation: {
    color: "#999",
    fontSize: 11,
    fontFamily: "Montserrat-Regular",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  crv: {
    borderRadius: 8,
  },
  itemRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  itemOverview: {
    flexGrow: 1,
    flexDirection: "row",
  },
  itemIcon: {
    color: "#999",
    marginRight: 5,
    fontSize: 24,
  },
  itemNo: {
    color: "#333",
    marginRight: 5,
    fontFamily: "Montserrat-SemiBold",
    marginTop: 5,
    fontSize: 14,
  },
  btnSetting: {
    position: "absolute",
    right: 10,
    top: Platform.OS == "android" ? 10 + StatusBar.currentHeight : 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 10,
    padding: 7,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 1, height: 1 },
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  backgroundImage: {
    flex: 1,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    resizeMode: "contain",
    // backgroundColor: "#febe29"
  },
  btnSmall: {
    backgroundColor: Colors.goldUrban,
    // height: Metrics.HEIGHT * 0.10,
    height: 30,
    // width: 100,
    paddingLeft: 10,
    paddingRight: 10,
    // width: '100%',
    alignSelf: "center",
    elevation: 3,
    // shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnSmall_2: {
    backgroundColor: Colors.goldUrban,
    // height: Metrics.HEIGHT * 0.10,
    height: 40,
    width: 150,
    paddingLeft: 20,
    paddingRight: 20,
    // width: '100%',
    alignSelf: "center",
    elevation: 3,
    // shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 10,
    marginHorizontal: 10,
  },
  textBtnSmall: {
    textTransform: "capitalize",
    fontFamily: Fonts.type.proximaNovaReg,
    fontWeight: "400",
  },
  textMenu: {
    color: Colors.white,
    fontFamily: Fonts.type.proximaNovaReg,
    letterSpacing: 1,
    fontSize: 16,
    textAlign: "center",
    // paddingBottom: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#333",
  },
  btnLarge: {
    backgroundColor: Colors.goldUrban,
    // height: Metrics.HEIGHT * 0.10,
    height: 60,
    width: 300,
    paddingLeft: 20,
    paddingRight: 20,
    // width: '100%',
    alignSelf: "center",
    elevation: 3,
    // shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
};
