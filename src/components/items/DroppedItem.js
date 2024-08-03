import React from 'react';
import GaugeItem from './GaugeItem';
import TextItem from './TextItem';
import NavigateItem from './NavigateItem';
const DroppedItem = ({ item }) => {
  const commonProps = {
    id: item.id,
    style: { position: 'absolute', left: item.position.x, top: item.position.y },
    settingsData: item.settings,
  };
  switch (item.type) {
    case 'GAUGE':
      return <GaugeItem {...commonProps} />;
    case 'TEXT':
      return <TextItem {...commonProps} />;
    case 'NAV':
      return <NavigateItem {...commonProps} />;
    default:
      return null;
  }
};

export default DroppedItem;
