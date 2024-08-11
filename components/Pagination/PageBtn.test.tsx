import { render, screen, fireEvent } from '@testing-library/react';
import PageBtn from './PageBtn';

describe('PageBtn Component', () => {
  it('should display text correctly', () => {
    const text = 'Click Me';
    render(<PageBtn text={text} onClick={() => {}} />);
    const buttonElement = screen.getByText(text);
    expect(buttonElement).toBeInTheDocument();
  });

  it('should apply the provided className', () => {
    const text = 'Click Me';
    const className = 'custom-class';
    render(<PageBtn text={text} className={className} onClick={() => {}} />);
    const buttonElement = screen.getByText(text);
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('should be disabled when disabled prop is true', () => {
    const text = 'Click Me';
    render(<PageBtn text={text} disabled={true} onClick={() => {}} />);
    const buttonElement = screen.getByText(text);
    expect(buttonElement).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false or not provided', () => {
    const text = 'Click Me';
    render(<PageBtn text={text} onClick={() => {}} />);
    const buttonElement = screen.getByText(text);
    expect(buttonElement).not.toBeDisabled();
  });

  it('should call onClick when clicked', () => {
    const text = 'Click Me';
    const handleClick = vi.fn();
    render(<PageBtn text={text} onClick={handleClick} />);
    const buttonElement = screen.getByText(text);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
