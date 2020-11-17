export const Validations = {
  present(value) {
    if (!value) {
      return "不能为空";
    }
  },

  email(value) {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      return "电子邮件格式不正确";
    }
  }
};
