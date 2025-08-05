export class User {
  uid: string;
  fullName: string;
  email: string;
  isOnline: boolean;
  lastActive: Date;

  constructor({
    uid,
    fullName,
    email,
    isOnline = false,
    lastActive = new Date(),
  }: {
    uid: string;
    fullName: string;
    email: string;
    isOnline?: boolean;
    lastActive?: Date;
  }) {
    this.uid = uid;
    this.fullName = fullName;
    this.email = email;
    this.isOnline = isOnline;
    this.lastActive = lastActive;
  }

  toFirestoreObject() {
    return {
      uid: this.uid,
      fullName: this.fullName,
      email: this.email,
      isOnline: this.isOnline,
      lastActive: this.lastActive,
    };
  }
}
