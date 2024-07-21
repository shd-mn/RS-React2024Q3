import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardInfo from '../components/Card/CardInfo';

describe('CardInfo Component', () => {
  it('should display the infoText and info correctly', () => {
    const infoText = 'Info Text:';
    const info = 'This is the information.';

    render(<CardInfo infoText={infoText} info={info} />);
    const infoTextElement = screen.getByText(infoText);
    expect(infoTextElement).toBeInTheDocument();
    expect(infoTextElement.tagName.toLowerCase()).toBe('span');
    const infoElement = screen.getByText(info);
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toBeInTheDocument();
  });
});
