import * as React from 'react';
import './style.css';
const MAX_PASSWORD_STRENGTH = 10;

export const bgColorMapper = {
  3: 'Red',
  4: 'Red',
  5: 'Red',
  6: 'orange',
  7: 'orange',
  8: 'orange',
  9: 'green',
  10: 'green',
};
export default function App() {
  const [strength, setStrength] = React.useState(0);

  const handlePasswordStrength = ({ target }) => {
    const { value } = target;
    // max countribution to the strength of password by each char type can be 1 only
    const countUpp = Math.min(1, value.match(/[A-Z]/g)?.length || 0);
    const countLow = Math.min(1, value.match(/[a-z]/g)?.length || 0);
    const countNum = Math.min(1, value.match(/[0-9]/g)?.length || 0);
    const countSpecial = Math.min(
      1,
      value.match(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g)?.length || 0
    );

    if (value?.length > 32) return;
    else if (value?.length < 3) {
      setStrength(0);
    } else {
      debugger;
      const totalStrengthByType = countLow + countUpp + countNum + countSpecial;

      // total strength can be strength = length + type
      // so by the charecter type the length is 4  and length is 6 considering total strength is 10
      const strengthByType = Math.min(4, totalStrengthByType);
      // Min length to consider is 3; now if the password length is > 3
      // we need to group that length into 3 groups where each group of 3 chars will contribute
      // to the length of strength by 1, 6 is the max length to consider
      const strengthByLength = Math.min(6, Math.floor(value?.length / 3));
      const totalStrength = strengthByType + strengthByLength;
      setStrength(totalStrength);
    }
  };

  return (
    <div className="container">
      <h1>Password Strength Checker</h1>
      <p>Please enter your password</p>
      <input type="text" className="input" onChange={handlePasswordStrength} />
      <div
        className="strength-checker"
        style={{
          width: `${23 * (strength / MAX_PASSWORD_STRENGTH)}em`,
          backgroundColor: `${bgColorMapper[strength]}`,
        }}
      ></div>
      <span>{(strength / MAX_PASSWORD_STRENGTH) * 100}%</span>
    </div>
  );
}
