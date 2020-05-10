export const TRANSFER_TYPE_NAME = `transfer`;
export const ACTIVITY_TYPE_NAME = `activity`;

const ICON_PATH = `img/icons/`;

export const ROUTE_POINTS_TYPES = [
  {
    name: `check-in`,
    type: ACTIVITY_TYPE_NAME,
    supportingText: `Check-in in`,
    iconPath: ICON_PATH + `check-in.png`,
  },
  {
    name: `sightseeing`,
    type: ACTIVITY_TYPE_NAME,
    supportingText: `Sightseeing in`,
    iconPath: ICON_PATH + `sightseeing.png`,
  },
  {
    name: `restaurant`,
    type: ACTIVITY_TYPE_NAME,
    supportingText: `Restaurant in`,
    iconPath: ICON_PATH + `restaurant.png`,
  },
  {
    name: `taxi`,
    type: TRANSFER_TYPE_NAME,
    supportingText: `Taxi in`,
    iconPath: ICON_PATH + `taxi.png`,
  },
  {
    name: `bus`,
    type: TRANSFER_TYPE_NAME,
    supportingText: `Bus in`,
    iconPath: ICON_PATH + `bus.png`,
  },
  {
    name: `train`,
    type: TRANSFER_TYPE_NAME,
    supportingText: `Train in`,
    iconPath: ICON_PATH + `train.png`,
  },
  {
    name: `ship`,
    type: TRANSFER_TYPE_NAME,
    supportingText: `Ship in`,
    iconPath: ICON_PATH + `ship.png`,
  },
  {
    name: `transport`,
    type: TRANSFER_TYPE_NAME,
    supportingText: `Transport in`,
    iconPath: ICON_PATH + `transport.png`,
  },
  {
    name: `drive`,
    type: TRANSFER_TYPE_NAME,
    supportingText: `Drive in`,
    iconPath: ICON_PATH + `drive.png`,
  },
  {
    name: `flight`,
    type: TRANSFER_TYPE_NAME,
    supportingText: `Flight in`,
    iconPath: ICON_PATH + `flight.png`,
  },
];
