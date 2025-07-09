export class UserBuilder {
  // userId? -> oznacza to, że pozwalamy na to aby poczatkowo ta wartość była pusta, usunęłam
  // to bo oczekiwalismy ze nie będzie undefined
  private userId: string;
  private userPassword: string;

  withUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  withUserPassword(userPassword: string) {
    this.userPassword = userPassword;
    return this;
  }

  build() {
    return {
      userId: this.userId,
      userPassword: this.userPassword,
    };
  }
}
