import { StatusBar, Platform } from "react-native";
import { Fonts, Metrics, Colors } from "../Themes/";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default {
  layoutContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  homeBg: {
    flex: 1,
    paddingBottom: 30,
  },

  section: {
    flex: 1,
    paddingLeft: 0,
    alignItems: "center",
    width: "100%",
  },

  page: {
    flex: 1,
    width: "100%",
  },

  profile: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    paddingTop: 20 + getStatusBarHeight(),
    paddingBottom: 16,
    backgroundColor: Colors.headerOrange,
  },
  avatar: {
    marginRight: 10,
    borderRadius: 34,
  },
  profileName: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 3,
    marginTop: 15,
  },
  profileLocation: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 12,
    color: "#FFF",
    opacity: 0.7,
  },
  curve: {
    flex: 1,
    width: "100%",
    height: 70,
  },

  btnLayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  btnBox: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    width: "33%",
    marginBottom: 1,
  },
  btnImg: {
    marginBottom: 10,
  },
  btnText: {
    color: "#333",
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: 12,
    textAlign: "center",
  },

  message: {
    flex: 1,
    paddingVertical: 30,
    alignItems: "center",
    width: "100%",
  },
  item: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#97aecf",
  },
  record: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DDD",
    marginLeft: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
  },
  recordLast: {
    flexDirection: "row",
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingVertical: 10,
  },
  itemImg: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 15,
  },
  itemTitle: {
    color: "#333",
    fontSize: 12,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 0,
  },

  itemDesc: {
    color: "#666",
    fontSize: 12,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 5,
    lineHeight: 16,
    flex: 1,
    flexWrap: "wrap",
    // width: "100%",
  },
  itemDesc_bold: {
    color: "#666",
    fontSize: 11,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginBottom: 5,
    lineHeight: 16,
    flex: 1,
    fontWeight: "bold",
    // flexWrap: "wrap",

    // width: "100%",
  },
  itemDate: {
    color: "#999",
    fontSize: 10,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    // alignItems: "top",
  },
  crv: {
    borderRadius: 8,
  },

  headerBg: {
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  headerIcon: {
    fontSize: 24,
    color: "#555",
    marginRight: 5,
  },
  sHeader: {
    color: "#333",
    marginLeft: 3,
    fontSize: 14,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginTop: 5,
  },
  sBtn: {
    padding: 9,
    backgroundColor: "#f3f3f3",
    color: "#FFF",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  sLink: {
    color: "#666",
    fontSize: 12,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  imgBtn: { padding: 24, marginBottom: 5, tintColor: "#333" },
  settingBtn: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    backgroundColor: "#f3f3f3",
    color: "#FFF",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    // backgroundColor: "#febe29"
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
  btnSmall: {
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

  //style coming soon
  backgroundImage_2: {
    flex: 1,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    resizeMode: "contain",
    // backgroundColor: "#f7f0d7"
  },
  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.15,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
        marginTop: Fonts.moderateScale(25),
      },
    }),
    elevation: 0,
  },
  left: {
    flex: 0.5,
    backgroundColor: "transparent",
  },
  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  right: {
    flex: 0.5,
  },

  actionBarBtn: {
    alignSelf: "flex-start",
    marginLeft: -10,
  },
  textWhite: {
    color: "#333",
    fontFamily: Fonts.type.proximaNovaReg,
  },
  textMedium: {
    fontSize: 16,
  },
};
