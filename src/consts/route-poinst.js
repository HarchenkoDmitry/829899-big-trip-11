export const TRANSFER_TYPE_NAME = `transfer`;
export const ACTIVITY_TYPE_NAME = `activity`;

const ICON_PATH = `img/icons/`;

export const ROUTE_POINTS_TYPES = {
  'check-in': {
    type: ACTIVITY_TYPE_NAME,
    supportingText: `Check-in in`,
    iconPath: ICON_PATH + `check-in.png`,
  },
  'sightseeing': {
    type: ACTIVITY_TYPE_NAME,
    supportingText: `Sightseeing in`,
    iconPath: ICON_PATH + `sightseeing.png`,
  },
  'restaurant': {
    type: ACTIVITY_TYPE_NAME,
    supportingText: `Restaurant in`,
    iconPath: ICON_PATH + `restaurant.png`,
  },
  'taxi': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Taxi in`,
    iconPath: ICON_PATH + `taxi.png`,
  },
  'bus': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Bus in`,
    iconPath: ICON_PATH + `bus.png`,
  },
  'train': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Train in`,
    iconPath: ICON_PATH + `train.png`,
  },
  'ship': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Ship in`,
    iconPath: ICON_PATH + `ship.png`,
  },
  'transport': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Transport in`,
    iconPath: ICON_PATH + `transport.png`,
  },
  'drive': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Drive in`,
    iconPath: ICON_PATH + `drive.png`,
  },
  'flight': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Flight in`,
    iconPath: ICON_PATH + `flight.png`,
  },
};

export const ROUTE_POINTS_TYPES_NAMES = [
  `check-in`, `sightseeing`, `restaurant`, `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`,
];
