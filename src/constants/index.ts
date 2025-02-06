export enum USER_ROLES {
  STUDENT = "student",
  FACULTY = "faculty",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export enum BUS_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  MAINTENANCE = "maintenance",
}
export enum STUDENT_DENSITY {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TRIP_STATUS {
  SCHEDULED = "scheduled",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export enum BUS_TYPE {
  STUDENT = "student",
  FACULTY = "faculty",
}

export enum SOCKET_EVENTS {
  JOIN_ROUTE = "join-route",
  BROADCAST_BUS_LOCATION = "broadcast-bus-location",
  VIEW_LOCATIONS = "view-locations",
  REQUEST_BUS_LOCATION = "request-bus-location",
  BUS_LOCATION_UPDATE = "bus-location-update",
}

// direction.enum.ts
export enum SCHEDULE_DIRECTIONS {
  TO_CAMPUS = "to_campus",
  FROM_CAMPUS = "from_campus",
}

// userType.enum.ts
export enum SCHEDULE_USER_TYPES {
  STUDENT = "student",
  FACULTY = "faculty",
  ADMIN = "admin",
  DRIVER = "driver",
  ALL = "all",
}
export enum SCHEDULE_TYPES {
  REGULAR = "regular",
  MID_TERM = "mid_term",
  FINAL_TERM = "final_term",
}

export enum SCHEDULE_OPERATING_DAYS {
  SATURDAY = "saturday",
  SUNDAY = "sunday",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
}
