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
  Modal,
  ActivityIndicator,
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
  Card,
  Segment,
  ListItem,
} from "native-base";

import { Actions } from "react-native-router-flux";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import { Style, Colors, Fonts } from "../Themes";
import Styles from "./Style";

import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import moment from "moment";

import numFormat from "@Component/numFormat";

let isMount = false;
// create a component
class MyBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: null,
      isLoaded: true,
      activePage: 1,
      dataReject: [],
      dataPending: [],
      dataApprove: [],
      entity_cd: "",
      project_no: "",
      db_profile: "",
      agent_cd: "",
      payment_attachment: "",
      tesfoto: [],
      uploadfoto: false,
      dataProjectName: [],
      dataPrincipalName: [],
      dataLeadName: [],

      // dataPending: []
    };
    this.selectComponent = this.selectComponent.bind(this);

    console.log("props cf", props);
  }

  async componentDidMount() {
    isMount = true;
    const items = this.props.items;
    // const enti = this.props.entity_cd;
    // _storeData("@dataItems", items);
    console.log("itemsnih", items);
    // console.log("entiy", enti);

    const data = {
      hd: new Headers({
        Token: await _getData("@Token"),
      }),
      entity_cd: items.entity_cd,
      project_no: items.project_no,
      db_profile: items.db_profile,
      agent_cd: await _getData("@AgentCd"),
      // user: await _getData("@User"),
      name: await _getData("@Name"),
    };
    console.log("data", data);
    this.setState(data, () => {
      this.getBookingPending();
      this.getBookingReject();
      this.getBookingApprove();
      this.getProjectName();
      this.getPrincipalName();
      this.getLeadName();
    });
  }

  getBookingPending = () => {
    // this.setState({ isLoaded: !this.state.isLoaded });
    const entity_cd = this.state.entity_cd;
    console.log("en", entity_cd);
    const project_no = this.state.project_no;
    console.log("en", project_no);
    const db_profile = this.state.db_profile;
    const agent_cd = this.state.agent_cd;
    //  const dataItems=  await _getData("@dataItems")
    // const project_no = this.props.items.project_no;
    fetch(
      urlApi +
        "c_nup/getBookingPending/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        project_no +
        "/" +
        agent_cd,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({
            dataPending: resData,
            // tesfoto: resData.payment_attachment
          });
          console.log("datapending", resData);
          // console.log("tesfoto", resData.payment_attachment);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getBookingReject = () => {
    const entity_cd = this.state.entity_cd;
    console.log("en", entity_cd);
    const project_no = this.state.project_no;
    console.log("en", project_no);
    const db_profile = this.state.db_profile;
    const agent_cd = this.state.agent_cd;
    //  const dataItems=  await _getData("@dataItems")
    // const project_no = this.props.items.project_no;
    fetch(
      urlApi +
        "c_nup/getBookingReject/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        project_no +
        "/" +
        agent_cd,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataReject: resData });
          console.log("dataReject", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getBookingApprove = () => {
    const entity_cd = this.state.entity_cd;
    console.log("en", entity_cd);
    const project_no = this.state.project_no;
    console.log("en", project_no);
    const db_profile = this.state.db_profile;
    const agent_cd = this.state.agent_cd;
    //  const dataItems=  await _getData("@dataItems")
    // const project_no = this.props.items.project_no;
    fetch(
      urlApi +
        "c_nup/getBookingApprove/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        project_no +
        "/" +
        agent_cd,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataApprove: resData });
          console.log("dataApprove", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  DetailBooking(data) {
    const db_profile = this.state.db_profile;
    console.log("db", db_profile);
    console.log("data", data);
    console.log("order_id", data.order_id);
    const entity_cd = this.state.entity_cd;
    console.log("en pending", entity_cd);
    const project_no = this.state.project_no;
    const email_add_project = this.state.dataProjectName[0].email_add;
    console.log("pro pending", project_no);
    console.log("email_add_project", email_add_project);
    const principal_name = this.state.dataPrincipalName[0].principle_name;
    console.log("principal_name", principal_name);
    const lead_name = this.state.dataLeadName[0].group_name;
    console.log("lead name", lead_name);
    Actions.DetailBooking({
      order_id: data.order_id,
      data: data,
      db_profile: db_profile,
      entity_cd: entity_cd,
      project_no: project_no,
      email_add_project: email_add_project,
      principal_name: principal_name,
      lead_name: lead_name,
    });
  }

  DetailRejectBooking(data) {
    const db_profile = this.state.db_profile;
    console.log("db", db_profile);
    console.log("data", data);
    console.log("order_id", data.order_id);
    const entity_cd = this.state.entity_cd;
    console.log("en", entity_cd);
    const project_no = this.state.project_no;
    console.log("en", project_no);
    const email_add_project = this.state.dataProjectName[0].email_add;
    console.log("email_add_project", email_add_project);
    const principal_name = this.state.dataPrincipalName[0].principal_name;
    console.log("principal_name", principal_name);
    Actions.DetailRejectBooking({
      order_id: data.order_id,
      data: data,
      db_profile: db_profile,
      entity_cd: entity_cd,
      project_no: project_no,
      email_add_project: email_add_project,
      principal_name: principal_name,
    });
  }

  DetailApproveBooking(data) {
    const db_profile = this.state.db_profile;
    console.log("db", db_profile);
    console.log("data", data);
    console.log("order_id", data.order_id);
    const entity_cd = this.state.entity_cd;
    console.log("en", entity_cd);
    const project_no = this.state.project_no;
    console.log("en", project_no);
    const email_add_project = this.state.dataProjectName[0].email_add;
    console.log("email_add_project", email_add_project);
    const principal_name = this.state.dataPrincipalName[0].principal_name;
    console.log("principal_name", principal_name);
    Actions.DetailApproveBooking({
      order_id: data.order_id,
      data: data,
      db_profile: db_profile,
      entity_cd: entity_cd,
      project_no: project_no,
      email_add_project: email_add_project,
      principal_name: principal_name,
    });
  }

  componentWillReceiveProps(props) {
    // props dari B
    const uploadfoto = props.uploadfoto;
    console.log("uploadfoto dimybooking", uploadfoto);
    if (uploadfoto) {
      // console.log("uploadfoto dimybooking", uploadfoto);
      this.setState({ uploadfoto: uploadfoto });
      if (uploadfoto == true) {
        this.getBookingPending();
        this.setState({ uploadfoto: uploadfoto });
      }
      console.log("uploadfoto state", this.state.uploadfoto);
    }
  }

  componentWillUnmount() {
    // this.setState({isMount:false})
    isMount = false;
  }

  getProjectName = () => {
    const db_profile = this.state.db_profile;
    const entity_cd = this.state.entity_cd;
    const project_no = this.state.project_no;

    console.log("dbbbb", db_profile);

    fetch(
      urlApi +
        "c_nup/getProjectName/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        project_no,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataProjectName: resData });
          console.log("dataProjectName", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPrincipalName = () => {
    const db_profile = this.state.db_profile;
    const entity_cd = this.state.entity_cd;
    const agent_cd = this.state.agent_cd;

    // console.log()
    console.log("dbbbb", db_profile);

    fetch(
      urlApi +
        "c_nup/getPrincipalName/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        agent_cd,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataPrincipalName: resData });
          console.log("dataPrincipalName", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getLeadName = () => {
    const db_profile = this.state.db_profile;
    const entity_cd = this.state.entity_cd;
    const agent_cd = this.state.agent_cd;

    // console.log()
    console.log("dbbbb", db_profile);

    fetch(
      urlApi +
        "c_nup/getLeadName/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        agent_cd,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataLeadName: resData });
          console.log("dataLeadName", resData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectComponent = (activePage) => () => this.setState({ activePage });

  _renderComponent = () => {
    if (this.state.activePage === 1)
      return (
        <Content>
          {this.state.dataPending == null ? (
            <View
              style={{
                flex: 1,
                // flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
                top: 200,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: Fonts.type.proximaNovaBoldWeb,
                  color: Colors.navyUrban,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Data Available
              </Text>
            </View>
          ) : (
            <ScrollView>
              {this.state.dataPending.map((data, key) =>
                this.state.dataPending ? (
                  <ListItem onPress={() => this.DetailBooking(data)} key={key}>
                    <View
                      style={{
                        // flexDirection: "column",
                        height: 70,
                        // width: "100%",
                        right: 20,
                        // left:
                        paddingLeft: 10,
                      }}
                    >
                      <View style={{ width: "100%", paddingBottom: 20 }}>
                        <Left style={{ position: "absolute", left: 20 }}>
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaBold,
                              alignSelf: "flex-start",
                              color: Colors.navyUrban,
                              marginBottom: 5,
                              fontSize: 16,
                            }}
                          >
                            #{data.order_id}
                          </Text>
                        </Left>
                      </View>
                      <View style={{ width: "100%", paddingBottom: 20 }}>
                        <Left style={{ position: "absolute", left: 20 }}>
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaBold,
                              alignSelf: "flex-start",
                              color: Colors.navyUrban,
                              marginBottom: 5,
                              fontSize: 16,
                            }}
                          >
                            {data.full_name}
                          </Text>
                        </Left>
                      </View>
                      <View style={{ width: "100%", paddingBottom: 20 }}>
                        <Left style={{ position: "absolute", left: 20 }}>
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaBold,
                              alignSelf: "flex-start",
                              color: Colors.navyUrban,
                              marginBottom: 5,
                              fontSize: 16,
                            }}
                          >
                            Rp. {numFormat(parseInt(data.total_amt))},-
                          </Text>
                        </Left>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          paddingBottom: 20,
                          flexDirection: "row",
                        }}
                      >
                        <Left style={{ position: "absolute", left: 20 }}>
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaBold,
                              alignSelf: "flex-start",
                              color: Colors.goldUrban,
                              marginBottom: 5,
                              fontSize: 13,
                            }}
                          >
                            {moment(data.order_date).format("DD MMM YYYY")}
                            {/* {diffDate(data.order_date) > 1 ? (
                            <Text>Time Out</Text>
                          ) : (
                            <Text>Waiting Payment</Text>
                          )} */}
                          </Text>
                        </Left>
                      </View>
                    </View>
                    <View style={{ width: "100%", paddingBottom: 0 }}>
                      {data.payment_attachment == null ? (
                        <Right
                          style={{ position: "absolute", right: 20, top: 25 }}
                        >
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaBold,
                              alignSelf: "flex-end",
                              color: Colors.yellow,
                              marginBottom: 5,
                              fontSize: 13,
                              // right: 0
                            }}
                          >
                            Waiting Payment
                          </Text>
                        </Right>
                      ) : (
                        <Right
                          style={{ position: "absolute", right: 20, top: 25 }}
                        >
                          <Text
                            style={{
                              fontFamily: Fonts.type.proximaNovaBold,
                              alignSelf: "flex-end",
                              color: Colors.yellow,
                              marginBottom: 5,
                              fontSize: 13,
                              // right: 0
                            }}
                          >
                            Waiting Approval
                          </Text>
                        </Right>
                      )}
                    </View>
                  </ListItem>
                ) : (
                  <ActivityIndicator style={{ color: Colors.navyUrban }} />
                )
              )}
            </ScrollView>
          )}
        </Content>
      );
    //... Your Component 1 to display
    if (this.state.activePage === 2)
      return (
        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          {this.state.dataApprove == 0 ? (
            <View
              style={{
                flex: 1,
                // flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
                top: 200,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: Fonts.type.proximaNovaBoldWeb,
                  color: Colors.navyUrban,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Data Available
              </Text>
            </View>
          ) : (
            <ScrollView>
              {this.state.dataApprove.map((data, key) => (
                <ListItem
                  onPress={() => this.DetailApproveBooking(data)}
                  key={key}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      height: 30,
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "100%", paddingBottom: 20 }}>
                      <Left style={{ position: "absolute", left: 20 }}>
                        <Text
                          style={{
                            fontFamily: Fonts.type.proximaNovaBold,
                            alignSelf: "flex-start",
                            color: Colors.navyUrban,
                            marginBottom: 5,
                            fontSize: 16,
                          }}
                        >
                          #{data.order_id}
                        </Text>
                      </Left>
                    </View>

                    <View style={{ width: "100%" }}>
                      <Left style={{ position: "absolute", left: 20 }}>
                        <Text
                          style={{
                            fontFamily: Fonts.type.proximaNovaBold,
                            alignSelf: "flex-start",
                            color: Colors.goldUrban,
                            marginBottom: 5,
                            fontSize: 13,
                          }}
                        >
                          {moment(data.order_date).format("DD MMM YYYY")}
                        </Text>
                      </Left>
                    </View>
                  </View>
                </ListItem>
              ))}
            </ScrollView>
          )}
        </Content>
      );
    else
      return (
        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          {this.state.dataReject == 0 ? (
            <View
              style={{
                flex: 1,
                // flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
                top: 200,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: Fonts.type.proximaNovaBoldWeb,
                  color: Colors.navyUrban,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Data Available
              </Text>
            </View>
          ) : (
            <ScrollView>
              {this.state.dataReject.map((data, key) => (
                <ListItem
                  onPress={() => this.DetailRejectBooking(data)}
                  key={key}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      height: 70,
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "100%", paddingBottom: 20 }}>
                      <Left style={{ position: "absolute", left: 20 }}>
                        <Text
                          style={{
                            fontFamily: Fonts.type.proximaNovaBold,
                            alignSelf: "flex-start",
                            color: Colors.navyUrban,
                            marginBottom: 5,
                            fontSize: 16,
                          }}
                        >
                          #{data.order_id}
                        </Text>
                      </Left>
                    </View>
                    <View style={{ width: "100%", paddingBottom: 20 }}>
                      <Left style={{ position: "absolute", left: 20 }}>
                        <Text
                          style={{
                            fontFamily: Fonts.type.proximaNovaBold,
                            alignSelf: "flex-start",
                            color: Colors.navyUrban,
                            marginBottom: 5,
                            fontSize: 16,
                          }}
                        >
                          {data.full_name}
                        </Text>
                      </Left>
                    </View>
                    <View style={{ width: "100%", paddingBottom: 20 }}>
                      <Left style={{ position: "absolute", left: 20 }}>
                        <Text
                          style={{
                            fontFamily: Fonts.type.proximaNovaBold,
                            alignSelf: "flex-start",
                            color: Colors.navyUrban,
                            marginBottom: 5,
                            fontSize: 16,
                          }}
                        >
                          Rp. {numFormat(parseInt(data.total_amt))},-
                        </Text>
                      </Left>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Left style={{ position: "absolute", left: 20 }}>
                        <Text
                          style={{
                            fontFamily: Fonts.type.proximaNovaBold,
                            alignSelf: "flex-start",
                            color: Colors.goldUrban,
                            marginBottom: 5,
                            fontSize: 13,
                          }}
                        >
                          {moment(data.order_date).format("DD MMM YYYY")}
                        </Text>
                      </Left>
                    </View>
                  </View>
                </ListItem>
              ))}
            </ScrollView>
          )}
        </Content>
      );
  };

  render() {
    return (
      <Container style={Style.bgMain}>
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
                letterSpacing: 1,
              }}
              // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
            >
              My Booking
              {/* {this.state.projectdesc} */}
            </Text>
          </View>
        </View>
        <View>
          <Segment style={{ backgroundColor: Colors.white }}>
            <Button
              first
              active={this.state.activePage === 1}
              onPress={this.selectComponent(1)}
              style={
                this.state.activePage === 1
                  ? {
                      backgroundColor: "#fff",
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.goldUrban,
                      width: "33%",
                    }
                  : { backgroundColor: "#fff", width: "33%" }
              }
            >
              <Text
                style={
                  this.state.activePage === 1
                    ? {
                        color: Colors.navyUrban,
                        textAlign: "center",
                        width: "100%",
                      }
                    : {
                        color: Colors.greyUrban,
                        textAlign: "center",
                        width: "100%",
                      }
                }
              >
                Pending
              </Text>
            </Button>
            <Button
              active={this.state.activePage === 2}
              onPress={this.selectComponent(2)}
              style={
                this.state.activePage === 2
                  ? {
                      backgroundColor: "#fff",
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.goldUrban,
                      //   width: 30
                      width: "33%",
                    }
                  : { backgroundColor: "#fff", width: "33%" }
              }
            >
              <Text
                style={
                  this.state.activePage === 2
                    ? {
                        color: Colors.navyUrban,
                        textAlign: "center",
                        width: "100%",
                      }
                    : {
                        color: Colors.greyUrban,
                        textAlign: "center",
                        width: "100%",
                      }
                }
              >
                Approved
              </Text>
            </Button>
            <Button
              last
              active={this.state.activePage === 3}
              onPress={this.selectComponent(3)}
              style={
                this.state.activePage === 3
                  ? {
                      backgroundColor: "#fff",
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.goldUrban,
                      //   width: 30
                      width: "33%",
                    }
                  : { backgroundColor: "#fff", width: "33%" }
              }
            >
              <Text
                style={
                  this.state.activePage === 3
                    ? {
                        color: Colors.navyUrban,
                        textAlign: "center",
                        width: "100%",
                      }
                    : {
                        color: Colors.greyUrban,
                        textAlign: "center",
                        width: "100%",
                      }
                }
              >
                Reject
              </Text>
            </Button>
          </Segment>
        </View>
        <Content padder>{this._renderComponent()}</Content>
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
    backgroundColor: "#2c3e50",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

//make this component available to the app
export default MyBooking;
