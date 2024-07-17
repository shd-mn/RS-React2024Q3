function ErrorProneComponent() {
  throw new Error('Simulate Error');
  return <div>Should not render</div>;
}

export default ErrorProneComponent;
