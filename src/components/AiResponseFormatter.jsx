function formatResponseToJSX(text) {
  const lines = text.trim().split("\n").filter(line => line.startsWith("*"));

  return (
    <ul className="list-disc ml-4 space-y-1">
      {lines.map((line, idx) => {
        // Remove "*   " prefix and process bold (**text**)
        const content = line.replace(/^\*\s*/, "").replace(/\*\*(.+?)\*\*/g, (_, bold) => `@@${bold}@@`);

        // Split into parts: normal text and bold text
        const parts = content.split(/@@(.*?)@@/g); // split by our placeholder

        return (
          <li key={idx} className="text-gray-700 text-sm">
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default formatResponseToJSX;