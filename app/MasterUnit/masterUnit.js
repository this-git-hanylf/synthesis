import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
  ActivityIndicator
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
  View,
  FooterTab,
    Badge,
  Spinner
} from "native-base";
import RadioGroup from "react-native-custom-radio-group";
import { Actions } from "react-native-router-flux";
import { Style } from "../Themes/";
import { Fonts, Metrics, Colors } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
// import Shimmer from 'react-native-shimmer';
// import Shimmer from "@Component/Shimmer";
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);


export default class Project extends React.Component {
  state = {
    dataTower: [],
      isVisible: false,
      dataLevel: [],
      isLoaded: false,
    dataUnit: []
  };

    async componentDidMount() {
        //   console.log('Data Project',await _getData('@UserProject'));
        const data = {
            hd: new Headers({
                Token: await _getData("@Token")
            }),
            email: await _getData("@User"),
            name: await _getData("@Name"),
            dataTower: await _getData("@UserProject"),
            from_data_project: this.props.prevItems

        };
        
        console.log("data didmount", data);

        this.setState(data, () => {
            this.getLevel();
            this.getEnquiry();
            // this.getPrice();
        });
    }

    

 getLevel = () => {
     let { db_profile, entity_cd, project_no, property_cd } = this.props.prevItems;
     console.log('db profile', db_profile);
     console.log('entity_cd', entity_cd);
   console.log("project_noooo", project_no);
   console.log("property_cd", property_cd);
     
     fetch(
      urlApi +
        "c_product_info/getLevelEnquiry/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
       project_no +
      
       "/" +
       property_cd,
       
      {
        method: "GET",
        headers: this.state.hd
      }
    )
      .then(response => response.json())
      .then(res => {
        if (!res.Error) {
          const resData = res.Data;

          this.setState({ dataLevel: resData });

          console.log('getLevel',resData);
        }
      })
      .catch(error => {
        console.log(error);
      });
    
 };
    
    getEnquiry = () => {
        let { db_profile, entity_cd, project_no, tower, lot_type, property_cd } = this.props.prevItems
   
    // !tower ? (tower = 1) : tower;
      !lot_type ? (lot_type = "") : lot_type;
      
      console.log("prrops item", this.props.prevItems)

       console.log('db profile', db_profile);
     console.log('entity_cd', entity_cd);
        console.log("project_noooo", project_no);
        console.log("lot_type", lot_type);
      console.log("property_cd", property_cd);
    

    fetch(
      urlApi +
        "c_product_info/getAllUnit/" +
        db_profile +
        "/" +
        entity_cd +
        "/" +
        project_no +
        "/" +
       property_cd +
        "/" +
        lot_type,
      {
        method: "GET",
        headers: this.state.hd
      }
    )
      .then(response => response.json())
      .then(res => {
        if (!res.Error) {
          const resData = res.Data;

          // var arr2 = resData.reduce( (a,b) => {
          //     var i = a.findIndex( x => x.id === b.id);
          //     return i === -1 ? a.push({ level_no : b.id, times : 1 }) : a[i].times++, a;
          // }, []);

          this.setState({ dataUnit: resData, isLoaded: true });
          console.log('getEnquiry', resData);
          // _storeData("@getUnitEnquiry", resData)
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

    GetGridViewItem(item) {
    Alert.alert(item);
    }
    
    clickUnitInfo(item) {
    
    // const grupcd = this.state.Group_cd;
    console.log('item',item);
    // console.log('grupcd', grupcd);
    // if (item.status == "A" || grupcd == 'Guest' || grupcd == 'DEBTOR') {
    // if (item.status == "A") {
    //   Actions.unitinfo({
    //     items: item,
    //     prevItems: this.props.prevItems,
    //     unitItems: this.props.unitItems,
    //     theItems: this.props.items,
    //     theItemz: this.props.lottypes,
    //     goToItems: this.props.gotoItems,
    //     // grupcd: grupcd
    //     // dashmenu:this.state.dashmenu
    //   });
    // } else {
    //   alert("This Unit is Not Available");
    // }
    // console.log('cek item dong', item);
    // this.setState({ click: true });
    }

    state = {
    isVisible: false //state of modal default false
  };
    
    render() {
      const { dataLevel, dataUnit } = this.state;
    const { project_descs } = this.props.prevItems;
     
    return (
      <Container style={Style.bgMain}>
        <Header style={Style.navigation}>
          <StatusBar
            backgroundColor={Colors.statusBarNavy}
            animated
            barStyle="dark-content"
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
                type="FontAwesome5"
              />
            </Button>
          </View>
          <View style={Style.actionBarMiddle}>
            <Text style={Style.actionBarText}>
              {"Master Unit".toUpperCase()}
            </Text>
          </View>
          <View style={Style.actionBarRight}></View>
            </Header>
            
<View style={{ padding: 16 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#000000"
            }}
          >
            {project_descs}
          </Text>

          {/* <Text style={{ fontSize: 15, color: "#000000" }}>Apartment</Text> */}
            </View>
            
            <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          <View style={styles.container}></View>
          <View style={styles.MainContainer}>
            {/* head */}

            {/* end head */}

            {/* top fixed */}

            <View
              style={{
                backgroundColor: "#ffffff",
                width: "100%",
                height: 50
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ padding: 10, width: "40%" }}>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 15,
                      fontFamily: Fonts.type.sfuiDisplaySemibold
                    }}
                  >
                    Block / Floor
                  </Text>
                </View>
                <View style={{ padding: 10, width: "70%"}}>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 15,
                      textAlign: "center",
                      fontFamily: Fonts.type.sfuiDisplaySemibold 
                    }}
                  >
                    Unit
                  </Text>
                </View>
              </View>
                    </View>
                    
                    {!this.state.isLoaded ? (
              <Spinner color={Colors.headerOrange} />
            ) : (
              this.state.dataLevel.map((level, key) => (
                <View
                  key={key}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    flex: 1
                  }}
                >
                  <View
                    style={[{ width: "90%" }, styles.GridViewBlockStyle_Left]}
                  >
                    <Text>{level.descs}</Text>
                  </View>
                  
                  <ScrollView style={{width: '50%'}} horizontal={true} bounces={false}>  
                    {this.state.dataUnit.map((unit, key) => {
                      if (unit.level_no == level.level_no) {
                        return (
                          <View style={styles.GridViewBlockStyle} key={key}>
                            {
                              this.state.Group_cd == 'Guest' || this.state.Group_cd == 'DEBTOR' ?
                              <TouchableOpacity
                              style={[
                                {
                                  backgroundColor: unit.status !== "A" && unit.status == 'A' ? "#ffffff" : "#ffffff"
                                },
                                styles.childGridView
                              ]}
                              onPress={() => this.clickUnitInfo(unit)}
                            >
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "#000000",
                                  textAlign:"center"
                                }}
                              >
                                {" "}
                                {unit.lot_no}{" "}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "#000000",
                                  textAlign: "center"
                                }}
                              >
                                {unit.descs}
                              </Text>
                            </TouchableOpacity>
                            :
                            // this.state.Group_cd == 'ADMINWEB' || this.state.Group_cd == 'INHOUSE' ?
                            <TouchableOpacity
                              style={[
                                {
                                  backgroundColor:
                                    unit.status == "A" ? "#34eb6e" 
                                    :
                                    unit.status == "R" ? "#FFDE4A"
                                    : "#eb4034" 
                                },
                                styles.childGridView
                              ]}
                              onPress={() => this.clickUnitInfo(unit)}
                            >
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "#ffffff",
                                  textAlign: "center"
                                }}
                              >
                                {" "}
                                {unit.lot_no}{" "}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "#ffffff",
                                  textAlign: "center"
                                }}
                              >
                                {unit.descs}
                              </Text>
                            </TouchableOpacity>
                            // :
                            // null
                            }
                            
                          </View>
                        );
                      } else {
                        return null;
                      }
                    })}
                    </ScrollView>
              </View>
              ))
                        )} 
                    </View>
        </Content>

       
        </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flexibleContainer: {
    flex: 1
  },
  text: {
    textAlign: "center",
    color: "#02326b",
    fontSize: 40,
    lineHeight: 80
  },
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },

  GridViewBlockStyle_Left: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    height: 55,
    // marginTop: 5,
    backgroundColor: "#ff720d",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },

  GridViewBlockStyle: {
    justifyContent: "center",
    // start: 'left',
    flex: 1,
    // alignItems: 'center',
    height: '90%',
    width: '100%',
    
    // borderRadius: 20,
    // margin: 5,
    padding: 1,
    backgroundColor: "white",
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },

  GridViewInsideTextItemStyle: {
    color: "#fff",
    //  padding: 10,
    fontSize: 18,
    justifyContent: "center",
    fontFamily: Fonts.type.sfuiDisplaySemibold
  },
  childGridView: {
    borderRadius: 10,
    paddingLeft: 5,
    borderWidth: 3,
    borderColor: "#c1c1c0",
    elevation: 2,
    height: 58,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 2
  },
  contentContainer:{
    paddingVertical: 20
  }
});
