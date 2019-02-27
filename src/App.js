import React, { Component } from "react";
import "./stylesheets/App.css";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./components/WestworldMap";
import Headquarters from "./components/Headquarters";

class App extends Component {
  constructor() {
    super();

    this.state = {
      hosts: [], // holds all hosts after fetch
      selected: "", // holds the name of the selected host to show in Details panel
      details: false, // if false shows image in detail panel, when true shows HostInfo in Details
      locations: {
        // keeps a current count of all Hosts in a given location
        high_plains: 0,
        lowlands: 0,
        under_construction: 0,
        pariah: 0,
        python_pass: 0,
        badlands: 0
      },
      activateAll: false, // activeates/decommisssions all Hosts when the button is pressed
      logs: [] // keeps track of all logs for the LogPanel
    };
  }

  // finds a host based on their id and changes their active status
  changeActiveStatus = id => {
    // find host
    const findHost = this.state.hosts.find(host => {
      return host.id === id;
    });
    //find position in array
    const index = this.state.hosts.indexOf(findHost);

    //setState and update exact host's active status
    this.setState({
      hosts: [
        ...this.state.hosts.slice(0, index),
        { ...this.state.hosts[index], active: !this.state.hosts[index].active },
        ...this.state.hosts.slice(index + 1)
      ]
    });
  };

  // finds a host based on their id and changes their area key
  changeLocation = (id, location) => {
    //find host
    const findHost = this.state.hosts.find(host => {
      return host.id === id;
    });
    //find position in array
    const index = this.state.hosts.indexOf(findHost);

    //setState and update exact host's area
    this.setState(
      {
        hosts: [
          ...this.state.hosts.slice(0, index),
          { ...this.state.hosts[index], area: location },
          ...this.state.hosts.slice(index + 1)
        ]
      },
      this.countCurrentLocations // recount after moving host
    );
  };

  // onClick of a host image thumbnail, set that host as selected and show their details
  selectedHost = name => {
    this.setState({
      selected: name,
      details: true
    });
  };

  // get current count of all host positions (needed because an area can only hold a certain number of hosts)
  countCurrentLocations = () => {
    let counting = {
      high_plains: 0,
      lowlands: 0,
      under_construction: 0,
      pariah: 0,
      python_pass: 0,
      badlands: 0
    };
    this.state.hosts.forEach(host => {
      counting[host.area] += 1;
    });
    this.setState({ locations: counting });
  };

  // activate/decommisssions all hosts
  toggleActivateAll = () => {
    //activate all hosts
    if (this.state.activateAll === false) {
      this.state.hosts.map(host => {
        return (host.active = true);
      });
      // add log to LogPanel
      this.addLogItem({
        key: "warn",
        message: "Activating all hosts!"
      });
    } else {
      //decommisssions all hosts
      this.state.hosts.map(host => {
        return (host.active = false);
      });
      // add log to LogPanel
      this.addLogItem({
        key: "notify",
        message: "Decommissiong all hosts."
      });
    }
    // update activateAll boolean
    this.setState({ activateAll: !this.state.activateAll });
  };

  // add log to logs array -- shows in LogPanel
  addLogItem = log => {
    let currentLogs = [...this.state.logs, log];
    this.setState({ logs: currentLogs });
  };

  render() {
    return (
      <Segment id="app">
        {/* props to send down to WW Map (all hosts, selected boolean
        selected host name) */}
        <WestworldMap
          hosts={this.state.hosts}
          selected={this.state.selected}
          selectedHost={this.selectedHost}
        />
        {/* props to send down to HQ */}
        <Headquarters
          hosts={this.state.hosts}
          changeActiveStatus={this.changeActiveStatus}
          selectedHost={this.selectedHost}
          selected={this.state.selected}
          details={this.state.details}
          changeLocation={this.changeLocation}
          currentCount={this.state.locations}
          activateAll={this.state.activateAll}
          toggleActivateAll={this.toggleActivateAll}
          addLogItem={this.addLogItem}
          logs={this.state.logs}
        />
      </Segment>
    );
  }

  componentDidMount() {
    // fetch all hosts
    fetch("http://localhost:4000/hosts")
      .then(resp => resp.json())
      .then(data => {
        // setState for fetched data        count all locations
        this.setState({ hosts: data }, this.countCurrentLocations);
      });
  }
}

export default App;
