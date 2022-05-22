const ERR_3_LETTER_COUNTRY_CODE = "ERR_3_LETTER_COUNTRY_CODE";

class ValidationSuccess {
  constructor() {
    this.success = true;
  }
}

class ValidationError {
  constructor(value) {
    this.error = false;
  }
}

class CountryCodeValidator {
  constructor(value) {
    this.value = value;
  }

  validate() {
    if (!this.value) return new ValidationSuccess();

    return (this.value && this.value.length === 0) ||
      /^[A-Za-z]{3}$/.test(this.value)
      ? new ValidationSuccess()
      : new ValidationError(ERR_3_LETTER_COUNTRY_CODE);
  }
}

describe("CountryCodeValidator", () => {
  it("should not return error for 3 char country code", () => {
    expect(new CountryCodeValidator("LVA").validate()).toEqual(
      new ValidationSuccess()
    );
  });

  it("undefined value?", () => {
    expect(new CountryCodeValidator(undefined).validate()).toEqual(
      new ValidationSuccess()
    );
  });

  it("empty string?", () => {
    expect(new CountryCodeValidator("").validate()).toEqual(
      new ValidationSuccess()
    );
  });

  it("integers?", () => {
    expect(new CountryCodeValidator(123).validate()).toEqual(
      new ValidationError(ERR_3_LETTER_COUNTRY_CODE)
    );
  });

  it("lowercase letters?", () => {
    expect(new CountryCodeValidator("lva").validate()).toEqual(
      new ValidationSuccess()
    );
  });

  it("mixed symbols?", () => {
    expect(new CountryCodeValidator("AZ2").validate()).toEqual(
      new ValidationError(ERR_3_LETTER_COUNTRY_CODE)
    );
  });
});
