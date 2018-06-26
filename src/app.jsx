import React from 'react';
import CallingButton from './Components/CallingButton';
import Dresser from './WindowDresser/dresser';
import ImagePreview from './Components/ImagePreview';
import PlatformSelect from './Components/PlatformSelect';

export default class App extends React.Component {
  static trueKeys(obj) {
    return Object.keys(obj).filter(k => obj[k]);
  }

  static selectedPlatforms(selections) {
    return this.trueKeys(selections.types)
      .map(p => [p, this.trueKeys(selections.platforms)]);
  }

  static writeMultiple(selection) {
    Object.entries(selection)
      .map(this.selectedPlatforms)
      .forEach(Dresser.writeType);
  }

  constructor(props) {
    super(props);

    this.state = {
      platforms: {
        android: true,
        ios: true,
        steam: true,
      },
      types: {
        icon: true,
        cover: true,
        screens: true,
      },
    };

    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(type, selection) {
    this.setState({
      [type]: selection,
    });
  }

  render() {
    return (<div>
      <h1>This wraps the Gritfish</h1>
      <PlatformSelect
        className="input-platform"
        state={this.state.platforms}
        handleSelection={this.handleSelection}
      />
      <div className="preview-wrapper">
        {Object.keys(this.state.types).map(type =>
          (<div className={`${type}-wrapper`} key={`${type}`}>
            <h2>{type}</h2>
            <div className={`${type}-buttons`}>
              {Dresser.sourcePaths(type).map(path =>
                <ImagePreview type={type} src={path} key={path} />,
              )}
            </div>
          </div>),
        )}
      </div>
      <CallingButton
        className="button-generate"
        click={() => App.selectedPlatforms(this.state).forEach(Dresser.write)}
      >
        Generate Assets
      </CallingButton>
    </div>);
  }
}
