const ERR_3_LETTER_COUNTRY_CODE = "ERR_3_LETTER_COUNTRY_CODE";

class ValidationSuccess {
  constructor() {
    this.success = true;
  }
}

class ValidationError {
  constructor(value) {
    this.error = true;
  }
}

/* 
  class CountryCodeValidator checks if given value:
    1.  if(!this.value), because of logical NOT operator, would return true
    if value given is falsey ('', 0, null, undefined, NaN, false) - these
    values should return true so the new ValidationSuccess() will be returned.

    2.(this.value && this.value.length === 0) checks nothing, because value.length === 0
    can be returned only to empty string, but that has been already checked in if statement above

    3. Regex expression /^[A-Za-z]{3}$/ checks if in given value meet these requirements
      1. uppercase (A-Z) and/or
      2. lowercase (a-z) letters and
      3. 3 letters allowed 
*/
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
    expect(new CountryCodeValidator(false).validate()).toEqual(
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
