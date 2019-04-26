import React, { ReactElement } from 'react';

import { beforeAfter, calculateWeeks } from '../utils/date';
import { PartsProps } from './props';

const Weeks: React.FC<PartsProps> = ({ date, today }): ReactElement | null => {
  const { weeks, days } = calculateWeeks(date, today);

  return weeks === 0
    ? null
    : (
      <li>
        {beforeAfter(weeks, 'tyg.')}
        {days === 0
          ? null
          : (
            <>
              <br />
              {`i ${Math.abs(days)} dni`}
            </>
          )}
      </li>
    );
};

export default Weeks;