type hospitalData = {
  name: string;
  details: {
    address: string;
    estimated_waiting_time: string;
    people_waiting_to_see_doctor: string;
    total_people_in_emergency_room: string;
    stretcher_occupancy_rate: string;
  };
};

// {
//   "name": "Centre de sant\u00e9 et de services sociaux du Granit",
//   "details": {
//       "address": "3569 rue Laval, Lac-M\u00e9gantic, G6B 1A5\nEstrie",
//       "estimated_waiting_time": "04:46",
//       "people_waiting_to_see_doctor": "6",
//       "total_people_in_emergency_room": "9",
//       "stretcher_occupancy_rate": "40%"
//   }
// },
