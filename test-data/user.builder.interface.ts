export interface User {
  userId: string;
  userPassword: string;
}

export class UserBuilder {
  private userId!: string;
  private userPassword!: string;
  

  withUserId(userId: string): this {
    this.userId = userId;
    return this;
  }

  withUserPassword(userPassword: string): this {
    this.userPassword = userPassword;
    return this;
  }

  build(): User {
    if (!this.userId || !this.userPassword) {
      throw new Error("Missing fields");
    }
    return {
      userId: this.userId,
      userPassword: this.userPassword,
    };
  }

  // 🔽 Zamiast konstruktora: metoda statyczna ustawiająca wartości domyślne, konstruktora używamy kiedy chcemy przekazywać wartości
  static default(): User  {
    return new UserBuilder()
      .withUserId('testerHi')
      .withUserPassword('08987654321')
      .build();
  }
}