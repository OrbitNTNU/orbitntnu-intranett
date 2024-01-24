type EventType = 'SOCIAL' | 'WORK' | 'PRIORITY'; // Add your actual enum values

export interface Event {
    eventID: number;
    name: string;
    startTime: Date;
    description?: string | null;
    location: string;
    memberID: number;
    timeOfCreation: Date;
    type: EventType;
    endTime: Date;
}