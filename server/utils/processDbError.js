let messages = [];
const handleValidationError = (err) => {
  if (typeof err !== "string") {
    for (let field in err.errors) {
      messages.push(err.errors[field].message);
    }
  } else {
    messages.push(err);
  }
  return messages;
};

const emptyPrevErrorMessages = () => (messages = []);

module.exports = {
  handleValidationError,
  emptyPrevErrorMessages,
};
