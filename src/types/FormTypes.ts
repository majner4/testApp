export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserInfoFormValues {
  firstName?: string;
  lastName?: string;
  age?: number | null;
  imageUrl?: string;
  id?: string;
}

export interface IUserNews {
  newsDescription?: string;
  titleNews?: string;
  createdDateNews?: Date;
  authorNews?: string;
}
