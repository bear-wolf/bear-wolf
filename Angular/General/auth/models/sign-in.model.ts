import { Field } from '@shared/modules/form-fields/models/field';

export class SignIn {
  public email: Field;
  public password: Field;

  get value() {
    return {
      email: this.email.model,
      password: this.password.model,
    };
  }

  constructor() {
  }

  isValid() {
    let status = true;
    let field = [
      this.email,
      this.password
    ];

    field.filter((item) => {
      if (item.required) {
        if (!item.validate()) {
          status = false;
        }
      }
    });

    return status;
  }
}
