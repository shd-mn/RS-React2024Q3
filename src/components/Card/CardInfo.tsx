interface PropTypes {
  infoText: string;
  info: string;
}

function CardInfo({ infoText, info }: PropTypes) {
  return (
    <p>
      <span>{infoText}</span>
      {info}
    </p>
  );
}

export default CardInfo;
