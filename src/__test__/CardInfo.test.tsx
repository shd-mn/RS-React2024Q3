import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardInfo from '../components/Card/CardInfo';

describe('CardInfo Component', () => {
  it('should display infoText and info correctly', () => {
    const infoText = 'Info Text:';
    const info = 'This is the information.';

    render(<CardInfo infoText={infoText} info={info} />);

    const infoTextElement = screen.getByText(infoText);
    const infoElement = screen.getByText(info);

    expect(infoTextElement).toBeInTheDocument();
    expect(infoElement).toBeInTheDocument();
  });

  it('should handle special characters in infoText and info', () => {
    const infoText = 'Special Info Text: © ® ™';
    const info = 'Special Information: 12345 !@#$%';

    render(<CardInfo infoText={infoText} info={info} />);

    const infoTextElement = screen.getByText(infoText);
    const infoElement = screen.getByText(info);

    expect(infoTextElement).toBeInTheDocument();
    expect(infoElement).toBeInTheDocument();
  });

  it('should render infoText inside a <span> and info outside the <span>', () => {
    const infoText = 'Info Text:';
    const info = 'This is the information.';

    render(<CardInfo infoText={infoText} info={info} />);

    const spanElement = screen.getByText(infoText);
    const pElement = spanElement.closest('p');

    expect(spanElement.tagName.toLowerCase()).toBe('span');
    expect(pElement).toContainHTML(info);
  });
});
