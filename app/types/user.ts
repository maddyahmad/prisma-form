export interface User {
  gender?: string;
  name: string;
  age: number;
  email: string;
}

export type partialUser = Partial<User>;

type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

export type MyPartialUser = MyPartial<User>;
