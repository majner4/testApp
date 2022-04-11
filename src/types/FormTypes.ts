export interface IFLoginFormValues {
  email: string;
  password: string;
}

export interface IFRegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IFUserInfoFormValues {
  firstName?: string;
  lastName?: string;
  age?: number | null;
  imageUrl?: string;
  id?: string;
}

export interface IFUserNews {
  newsDescription?: string;
  titleNews?: string;
  createdDateNews?: Date;
  authorNews?: string;
}
