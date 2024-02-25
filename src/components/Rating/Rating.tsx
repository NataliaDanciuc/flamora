import { FC } from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

type Props = {
  rating: number;
};

const Rating: FC<Props> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  const starElements = [];

  for (let i = 0; i < fullStars; i++) {
    starElements.push(<FaStar key={i} />);
  }

  if (decimalPart > 0) {
    starElements.push(<FaStarHalf key="half" />);
  }

  return <>{starElements}</>;
};

export default Rating;