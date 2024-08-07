import { Moon, Sunrise, Sunset } from "lucide-react";
import { Client } from "../../app/interface/client";
interface CardProps {
  period: "Manhã" | "Tarde" | "Noite";
  clients: Client[];
  onDelete: (id: string) => void;
}

function renderIcon(period: "Manhã" | "Tarde" | "Noite") {
  if (period === "Manhã") {
    return <Sunrise className="size-5 text-blue-500" />;
  } else if (period === "Tarde") {
    return <Sunset className="size-5 text-orange-500" />;
  } else {
    return <Moon className="size-5 text-yellow-500" />;
  }
}

export function Card({ period, onDelete, clients }: CardProps) {
  return (
    <section className="max-h-[250px] min-h-[136px] w-full overflow-scroll rounded-md bg-[#23242C] shadow-lg">
      <header className="flex items-center justify-between border-b border-b-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          {renderIcon(period)}
          <strong className="text-lg">{period}</strong>
        </div>
        <p className="text-lg font-medium text-gray-500">
          {period === "Manhã"
            ? "09h-12h"
            : period === "Tarde"
              ? "13h-18h"
              : "19h-21h"}
        </p>
      </header>
      {clients.length > 0 ? (
        <ul className="p-5">
          {clients.map((client) => (
            <li
              key={client.id}
              className="flex items-center border-b border-b-white/10 p-3 first:border-none"
            >
              <div className="flex flex-1 items-center gap-4">
                <span>{client.hour}</span>
                <h3>
                  <span className="font-bold text-blue-500">
                    {client.client.dog}
                  </span>{" "}
                  / {client.client.owner}
                </h3>
              </div>
              <span className="flex-1 text-center text-gray-300">
                {client.service}
              </span>
              <button
                onClick={() => onDelete(client.id ?? "")}
                className="flex-1 bg-transparent text-gray-500 outline-none transition-all hover:text-gray-300 hover:underline"
              >
                Remover agendamento
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-8 text-center text-sm text-gray-400">
          Sem Atendimentos 🐶
        </p>
      )}
    </section>
  );
}
