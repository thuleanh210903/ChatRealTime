export class User {
  uid: string;
  fullName: string;
  email: string;
  isOnline: boolean;
  lastActive: Date;
  avatarUrl: string;

  constructor({
    uid,
    fullName,
    email,
    isOnline = false,
    lastActive = new Date(),
    avatarUrl,
  }: {
    uid: string;
    fullName: string;
    email: string;
    isOnline?: boolean;
    lastActive?: Date;
    avatarUrl: string;
  }) {
    this.uid = uid;
    this.fullName = fullName;
    this.email = email;
    this.isOnline = isOnline;
    this.lastActive = lastActive;
    this.avatarUrl = avatarUrl;
  }

  toFirestoreObject() {
    return {
      uid: this.uid,
      fullName: this.fullName,
      email: this.email,
      isOnline: this.isOnline,
      lastActive: this.lastActive,
      avatarUrl: this.avatarUrl,
    };
  }
}
