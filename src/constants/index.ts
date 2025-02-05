
export enum USER_ROLES {
    STUDENT = 'student',
    FACULTY = 'faculty',
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin',
  }

export enum BUS_STATUS {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    MAINTENANCE = 'maintenance',
}
export enum STUDENT_DENSITY {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum TRIP_STATUS {
    SCHEDULED = 'scheduled',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
}

export enum BUS_TYPE {
    STUDENT = 'student',
    FACULTY = 'faculty',
}

export enum SOCKET_EVENTS {
    JOIN_ROUTE = 'join-route',
    BROADCAST_BUS_LOCATION = 'broadcast-bus-location',
    VIEW_LOCATIONS = 'view-locations',
    REQUEST_BUS_LOCATION = 'request-bus-location',
    BUS_LOCATION_UPDATE = 'bus-location-update',
}