import React, { ReactElement } from 'react';

import { beforeAfter, calculateMonths } from '../utils/date';
import { PartsProps } from './props';

const Months: React.FC<PartsProps> = ({ date, today }): ReactElement | null => {
  const { months, days } = calculateMonths(date, today);

  return months === 0
    ? null
    : (
      <li>
        {beforeAfter(months, 'm-cy')}
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

export default Months;