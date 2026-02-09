interface LoveLetterMessageProps {
  visible: boolean;
}

const MESSAGE = `Happy Teddy Day my love ❤️
I may not be a real teddy,
but I promise to hug you, protect you,
and stay with you forever.
I'm your teddy, always. 🧸`;

export default function LoveLetterMessage({ visible }: LoveLetterMessageProps) {
  if (!visible) return null;

  return (
    <div className="love-letter-message">
      <p className="letter-text">{MESSAGE}</p>
    </div>
  );
}
