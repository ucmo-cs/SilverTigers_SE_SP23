export const errorStyling = {
  color: "red",
  textAlign: "center",
  width: 1500,
};

export const validPositiveInteger = new RegExp("^(0*[1-9][0-9]*(.[0-9]+)?|0+.[0-9]*[1-9][0-9]*)$");

export const validPositiveNumber = new RegExp("^[1-9][0-9]*$");

export function UnknownUser() {
  return (
    <p style={errorStyling}>Username or Password does not match our records</p>
  );
}
