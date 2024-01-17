import './card.css';

const Card = ({title,value, className, btnCardHandler}) => {
  return (
      <div className={className} onClick={btnCardHandler}>
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
  );
};

export default Card;
