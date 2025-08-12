
import React from 'react';

type MarkdownProps = {
  text: string;
};

export function Markdown({ text }: MarkdownProps) {
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} className="list-disc pl-5 space-y-1">
            {listItems.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    const parseInline = (line: string) => {
        return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    for (const line of lines) {
      if (line.trim().startsWith('* ')) {
        if (!inList) {
          inList = true;
        }
        listItems.push(line.trim().substring(2));
      } else {
        flushList();
        if (line.trim()) {
           elements.push(<p key={elements.length} dangerouslySetInnerHTML={{ __html: parseInline(line) }} />);
        }
      }
    }
    flushList();

    return elements;
  };

  return <>{parseMarkdown(text)}</>;
}
