import type { Content } from '@google/genai';
import { MessageCircle } from 'lucide-react';

import Divider from '@/components/shared/Divider/intex';

const Dialog = ({ person, text }: { person: string; text: string }) => {
  return (
    <li className="text-muted-foreground">
      <Divider />
      <span className="flex gap-2 font-semibold">
        <MessageCircle className="text-primary" /> {person}
      </span>
      <p className="mt-2">{text}</p>
    </li>
  );
};

const IATalk = ({ messages }: { messages?: Content[] }) => {
  if (!messages || messages.length === 0) return null;

  return (
    <ul className="mb-4">
      {messages.map((msg, index) => {
        const person = msg.role === 'user' ? 'Você' : 'Resposta da IA';
        const text = msg.parts?.map((p) => p.text).join('') || '';
        return <Dialog key={index} text={text} person={person} />;
      })}
    </ul>
  );
};

export default IATalk;
