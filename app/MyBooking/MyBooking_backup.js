//import liraries
import React, { Component } from "react";
import {
  StatusBar,
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
  Modal
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
  Card
} from "native-base";

import { Actions } from "react-native-router-flux";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell
} from "react-native-table-component";
import { Style, Colors, Fonts } from "../Themes";
import Styles from "./Style";

import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import moment from "moment";
import TabBar from "@Component/TabBar2";
import ApproveBooking from "./ApproveBooking";
import PendingBooking from "./PendingBooking";
import RejectBooking from "./RejectBooking";

let isMount = false;
// create a component
class MyBooking_backup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: null,

      units: [],
      user: "",
      name: "",
      project: [],
      dataRow: [],
      entity: [],
      navState: {
        index: 0,
        routes: [
          { key: "approve", title: "APPROVED" },
          { key: "pending", title: "PENDING" },
          { key: "reject", title: "REJECT" }
        ]
      },

      navScene: {
        approve: ApproveBooking,
        pending: PendingBooking,
        reject: RejectBooking
      }
      // dataPending: []
    };

    console.log("props cf", props);
  }

  async componentDidMount() {
    isMount = true;
    const items = this.props.items;
    _storeData("@dataItems", items);
    console.log("itemsnih", items);

    // const dataPending = this.state.dataPending;
    // console.log("datapen", dataPending);
    const data = {
      hd: new Headers({
        Token: await _getData("@Token")
      }),
      // user: await _getData("@User"),
      name: await _getData("@Name")
      // project: await _getData("@UserProject"),
      // debtor: await _getData("@Debtor"),
      // group: await _datapgetData("@Group"),
      // entity_cd: items.entity_cd,
      // project_no: items.project_no

      // entity_cd: items.entity_cd,
      // project_no: items.project_no,
      // db_profile: items.db_profile
    };
    console.log("data", data);
    this.setState(data, () => {
      // this.getBookingPending();
      //   this.getBilling("", "", data.debtor, "");
    });
  }

  render() {
    // const tables = {
    //   tableHead: ["Date", "Description", "Amount", "Status"]
    // };

    return (
      <Container style={Style.bgMain}>
        {/* <Header style={Style.navigation}>
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
              {"My Booking".toUpperCase()}
            </Text>
          </View>
          <View style={Style.actionBarRight}></View>
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
                letterSpacing: 1
              }}
              // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
            >
              {this.state.name}
              {/* {this.state.projectdesc} */}
            </Text>
            <Text
              style={{
                fontWeight: "900",
                color: Colors.goldUrban,
                fontSize: 14,
                textAlign: "center",
                fontFamily: Fonts.type.proximaNovaBold,
                letterSpacing: 1
              }}
              // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
            >
              My Booking
              {/* {this.state.projectdesc} */}
            </Text>
          </View>
          {/* <TabBar
            navState={this.state.navState}
            navScene={this.state.navScene}
            style={{ paddingTop: 10 }}
          /> */}
        </View>
        <TabBar
          navState={this.state.navState}
          navScene={this.state.navScene}
          style={{ paddingTop: 10 }}
        />
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  text: {
    textAlign: "center",
    fontWeight: "bold"
  }
});

//make this component available to the app
export default MyBooking_backup;
