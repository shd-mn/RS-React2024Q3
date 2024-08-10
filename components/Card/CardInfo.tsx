interface PropTypes {
  infoText: string;
  info: string;
}

function CardInfo({ infoText, info }: PropTypes) {
  return (
    <li>
      <h5>{infoText}</h5>
      <p>{info}</p>
    </li>
  );
}

export default CardInfo;
