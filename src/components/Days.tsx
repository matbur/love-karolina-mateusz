import React, { ReactElement } from 'react';

import { beforeAfter, calculateDays } from '../utils/date';
import { PartsProps } from './props';

const Days: React.FC<PartsProps> = ({ date, today }): ReactElement => {
  const days = calculateDays(date, today);

  return (
    <li>
      {days === 0
        ? 'to już dzisiaj'
        : beforeAfter(days, 'dni')
      }
    </li>
  );
};

export default Days;